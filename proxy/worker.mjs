// TravelOft Gemini proxy. Holds the owner's API key server-side so it never
// ships in the public site bundle. Visitors can still paste their own key in
// the app, which the app uses directly (this worker is skipped then).
const ALLOWED_ORIGINS = [
  "https://prakruthi401.github.io",
  "http://localhost:5173",
  "http://localhost:4173",
];
const MODEL = "gemini-3.1-flash-lite";
const MAX_BODY_CHARS = 40000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST" || new URL(request.url).pathname !== "/") {
      return new Response("POST / only", { status: 405, headers: cors });
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "invalid JSON body" }, { status: 400, headers: cors });
    }
    if (!Array.isArray(body.contents) || JSON.stringify(body.contents).length > MAX_BODY_CHARS) {
      return Response.json({ error: "bad contents" }, { status: 400, headers: cors });
    }
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: body.contents, generationConfig: body.generationConfig }),
      }
    );
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
