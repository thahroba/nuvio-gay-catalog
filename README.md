# Nuvio community catalog

A small Stremio-protocol HTTP addon intended for Nuvio. It exposes a catalog, metadata and stream endpoint.

## Important content rules
- Only list content whose owner has made it publicly accessible and which you are authorized to link to.
- Do not add paywalled, private, leaked, scraped behind-login, or DRM-protected media.
- All people depicted must be adults (18+). Keep explicit material clearly age-gated and do not add it unless the hosting platform and local law permit it.
- This repository starts with an empty catalog. No creator or video links are invented.

## Deploy
1. Import this public repository into Render as a Blueprint, or create a Node web service from it.
2. Build command: `npm install`; start command: `npm start`.
3. After deployment, open `https://YOUR-SERVICE.onrender.com/manifest.json`.
4. In Nuvio, add that manifest URL in Addons.

## Add authorized public entries
Edit `data/catalog.json`. Each item can be a public video or creator profile. Example structure:

```json
{
  "items": [
    {
      "id": "nuvio-gay-example-001",
      "type": "movie",
      "kind": "video",
      "name": "Public preview title",
      "description": "A short description",
      "genre": "Non-explicit",
      "poster": "https://example.org/poster.jpg",
      "streams": [
        { "title": "Public video", "url": "https://example.org/public-video.mp4" }
      ]
    }
  ]
}
```

Use a direct HTTPS video URL for playback. A creator page URL alone is not a playable stream. The service does not bypass subscriptions or access controls.
