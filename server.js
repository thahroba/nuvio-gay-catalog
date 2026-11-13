import http from "node:http";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 7000);
const manifest = {
  id: "community.nuvio.gay.catalog",
  version: "1.0.0",
  name: "Open Men’s Video Catalog",
  description: "A catalog of links to lawful, publicly available adult (18+) video previews and creator pages. No paid or private content.",
  resources: ["catalog", "meta", "stream"],
  types: ["movie", "series"],
  catalogs: [
    { type: "movie", id: "gay-public", name: "Gay Men • Public Videos" },
    { type: "series", id: "creators", name: "Creators" }
  ],
  idPrefixes: ["nuvio-gay-"],
  behaviorHints: { configurable: false }
};

async function loadItems() {
  const raw = await readFile(new URL("./data/catalog.json", import.meta.url), "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data.items) ? data.items : [];
}
function json(res, body, status=200) {
  res.writeHead(status, {
    "content-type":"application/json; charset=utf-8",
    "access-control-allow-origin":"*",
    "cache-control":"no-store"
  });
  res.end(JSON.stringify(body));
}
const server = http.createServer(async (req,res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {"access-control-allow-origin":"*", "access-control-allow-methods":"GET,OPTIONS", "access-control-allow-headers":"content-type"});
    return res.end();
  }
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (url.pathname === "/") return json(res, {name:manifest.name, status:"ok", manifest:"/manifest.json"});
  if (url.pathname === "/manifest.json") return json(res, manifest);
  try {
    const parts = url.pathname.split("/").filter(Boolean);
    const id = (parts[2] || "").replace(/\.json$/i, "");
    const items = await loadItems();
    if (parts[0] === "catalog" && parts.length >= 3) {
      const type = parts[1];
      if (type !== "movie" && type !== "series") return json(res,{metas:[]});
      let filtered = items.filter(x => x.type === type);
      if (id === "gay-public") filtered = filtered.filter(x => x.kind !== "creator");
      if (id === "creators") filtered = filtered.filter(x => x.kind === "creator");
      return json(res,{metas:filtered.map(toMeta)});
    }
    if (parts[0] === "meta" && parts.length >= 3) {
      const item = items.find(x => x.id === id);
      return json(res,{meta:item ? toMeta(item) : null});
    }
    if (parts[0] === "stream" && parts.length >= 3) {
      const item = items.find(x => x.id === id);
      const streams = (item?.streams || []).filter(s => /^https:\/\//i.test(s.url || ""));
      return json(res,{streams:streams.map(s=>({title:s.title || item.name, url:s.url}))});
    }
    return json(res,{error:"Not found"},404);
  } catch (e) {
    return json(res,{error:"Catalog data error", detail:e.message},500);
  }
});
function toMeta(x) {
  return {
    id:x.id, type:x.type, name:x.name, poster:x.poster || undefined,
    description:x.description || "", genres:x.genre ? [x.genre] : [],
    releaseInfo:x.releaseInfo || "", runtime:x.runtime || undefined,
    links:x.creatorUrl ? [{name:"Creator page",category:"website",url:x.creatorUrl}] : []
  };
}
server.listen(PORT, "0.0.0.0", () => console.log(`Nuvio catalog listening on ${PORT}`));
