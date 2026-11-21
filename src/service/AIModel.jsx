import { GoogleGenerativeAI } from "@google/generative-ai";

// The key can come from the build env (local dev / her own deploy) or be
// pasted into the UI by a visitor - it stays in their browser either way.
export const getGeminiKey = () =>
  localStorage.getItem("traveloft_gemini_key") ||
  import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY ||
  "";

export const hasGeminiKey = () => Boolean(getGeminiKey());

export const setGeminiKey = (key) => {
  if (key) localStorage.setItem("traveloft_gemini_key", key.trim());
  else localStorage.removeItem("traveloft_gemini_key");
};

const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.5-flash";

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

export function makeChatSession() {
  const genAI = new GoogleGenerativeAI(getGeminiKey());
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  return model.startChat({ generationConfig, history: FEW_SHOT });
}
