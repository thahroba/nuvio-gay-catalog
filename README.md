# Nuvio community catalog (GitHub Pages)

This repository now includes a **static Stremio-protocol addon** under `docs/`, so it can be hosted by GitHub Pages without a paid Node server.

## Enable free hosting
1. Open the repository Settings → Pages.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/docs`, then Save.
4. Wait for GitHub Pages to publish. The addon manifest URL will be:
   `https://thahroba.github.io/nuvio-gay-catalog/manifest.json`
5. Add that URL in Nuvio → Addons.

## Current status
The catalog is intentionally empty. The manifest and catalog endpoints are static JSON files. No creator or video entries have been invented. A static addon needs a separate JSON file for each metadata and stream ID; when lawful, publicly accessible video links are supplied, those files can be added.

## Content rules
Only include links to media the owner has made publicly accessible and that you are authorized to link to. Do not add paywalled, private, leaked, login-gated, or DRM-protected media. All people depicted must be adults (18+), and applicable platform rules and local law must permit the content. A creator profile page is not itself a playable video stream.

## Static endpoint files
- `docs/manifest.json`
- `docs/catalog/movie/gay-public.json`
- `docs/catalog/series/creators.json`

The previous `server.js` and `render.yaml` are retained as historical files but are not needed for GitHub Pages.
