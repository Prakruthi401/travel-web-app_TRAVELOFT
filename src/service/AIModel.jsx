import { GoogleGenerativeAI } from "@google/generative-ai";

// The key can come from the build env (local dev / her own deploy) or be
// pasted into the UI by a visitor - it stays in their browser either way.
// Remove keys saved by earlier versions. New visitor keys last only for this tab.
localStorage.removeItem("traveloft_gemini_key");

export const getGeminiKey = () =>
  sessionStorage.getItem("traveloft_gemini_key") ||
  import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY ||
  "";

export const hasGeminiKey = () => Boolean(getGeminiKey());

// Server-side proxy holding the owner's key (see proxy/). Empty until deployed.
const PROXY_URL = import.meta.env.VITE_GEMINI_PROXY_URL || "";

// True when trips can be generated either through the proxy or a visitor key.
export const hasGeminiAccess = () => Boolean(PROXY_URL) || hasGeminiKey();

export const setGeminiKey = (key) => {
  if (key) sessionStorage.setItem("traveloft_gemini_key", key.trim());
  else sessionStorage.removeItem("traveloft_gemini_key");
};

const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.1-flash-lite";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 16384,
  responseMimeType: "application/json",
};

// One worked example keeps the model honest about the JSON shape the UI
// renders: hotel[] plus itinerary[] of { day, bestTime, plan[] }.
const FEW_SHOT = [
  {
    role: "user",
    parts: [
      {
        text: "Generate a travel plan for the destination: Hampi, Karnataka, India for 2 days. Traveler type: 2 people, with a Budget-Friendly budget. Quote ticket prices in INR (₹). Output in JSON format.",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: JSON.stringify({
          hotel: [
            {
              name: "Clarks Inn Hampi",
              address: "Near ASI Museum, Kamalapur, Hampi, Karnataka 583221",
              geoCoordinates: "15.3426, 76.4756",
              rating: 4.1,
              description:
                "Simple, clean rooms a short walk from the main ruins.",
            },
            {
              name: "Kishkinda Heritage Resort",
              address: "Sanapur Lake Road, Anegundi, Karnataka 583227",
              geoCoordinates: "15.3634, 76.4924",
              rating: 4.3,
              description:
                "Cottage-style stay across the river with coracle rides nearby.",
            },
          ],
          itinerary: [
            {
              day: "Day 1",
              bestTime: "Early morning",
              plan: [
                {
                  placeName: "Virupaksha Temple",
                  placeDetails:
                    "Living 7th-century temple on the Tungabhadra, still active.",
                  geoCoordinates: "15.3353, 76.4586",
                  ticketPricing: "₹50 (camera extra)",
                  rating: 4.8,
                  timeTravel: "1-2 hours",
                },
                {
                  placeName: "Vijaya Vittala Temple",
                  placeDetails:
                    "Stone chariot and musical pillars; the postcard shot of Hampi.",
                  geoCoordinates: "15.3419, 76.4750",
                  ticketPricing: "₹40 Indians / ₹600 foreign nationals",
                  rating: 4.9,
                  timeTravel: "2-3 hours",
                },
              ],
            },
            {
              day: "Day 2",
              bestTime: "Sunrise",
              plan: [
                {
                  placeName: "Matanga Hill",
                  placeDetails:
                    "Short climb for sunrise over the whole boulder-strewn valley.",
                  geoCoordinates: "15.3360, 76.4620",
                  ticketPricing: "Free",
                  rating: 4.7,
                  timeTravel: "2 hours",
                },
              ],
            },
          ],
        }),
      },
    ],
  },
];

function makeDirectSession() {
  const genAI = new GoogleGenerativeAI(getGeminiKey());
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  return model.startChat({ generationConfig, history: FEW_SHOT });
}

// Same sendMessage interface as the SDK chat, but the key stays on the server.
function makeProxySession() {
  return {
    async sendMessage(message) {
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [...FEW_SHOT, { role: "user", parts: [{ text: message }] }],
          generationConfig,
        }),
      });
      if (!res.ok) throw new Error(`proxy ${res.status}`);
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      return { response: { text: () => text } };
    },
  };
}

export function makeChatSession() {
  if (!PROXY_URL) return makeDirectSession();
  const viaProxy = makeProxySession();
  return {
    async sendMessage(message) {
      try {
        return await viaProxy.sendMessage(message);
      } catch (err) {
        // owner's key unreachable or over quota: use the visitor's key if given
        if (hasGeminiKey()) return makeDirectSession().sendMessage(message);
        throw err;
      }
    },
  };
}
