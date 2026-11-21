# Gemini proxy (Cloudflare Worker, free tier)

Keeps the owner's Gemini key server-side so it is not in the public site bundle.
The site calls this worker first; if it fails and the visitor pasted their own
key in the app, the app falls back to calling Gemini directly with that key.

Deploy:

```sh
npm install -g wrangler   # or: npx wrangler
wrangler login            # her Cloudflare account (free, no card)
wrangler secret put GEMINI_API_KEY
wrangler deploy
```

Then rebuild the site with `VITE_GEMINI_PROXY_URL=https://traveloft-gemini-proxy.<account>.workers.dev`
so the app knows the proxy exists.
