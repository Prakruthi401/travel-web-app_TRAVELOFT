# TravelOft

**Live site:** https://prakruthi401.github.io/travel-web-app_TRAVELOFT/

An AI trip planner that builds a day-by-day itinerary around your budget and who's travelling. Pick a destination, set the days, budget and group, and Google's Gemini drafts stay options plus a daily plan - ticket prices in ₹, ratings, and how long each stop actually takes.

## Demo

![TravelOft demo](assets/demo.gif)

## What it does

- **Destination search** with suggestions, powered by free OpenStreetMap data (Photon) - no paid maps API.
- **Trip generation** through the Gemini API: hotels with addresses and ratings, then a day-by-day itinerary with ticket prices, best time to start, and time needed per stop.
- **Place photos** pulled from Wikipedia articles at runtime, with a branded fallback when a place has no article image - so no Google Places billing account is needed.
- **No sign-up wall**: trips are saved per traveler name in the browser (localStorage). A bundled sample itinerary (Hampi, 2 days) opens straight from the landing page.

## Stack

React (Vite) · Tailwind CSS · @google/generative-ai · react-slick · Wikipedia REST API · Photon geocoder

## Running it locally

1. `npm install`
2. Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)
3. Either paste it into the app when prompted (stored only in your browser), or create `.env.local`:

   ```
   VITE_GOOGLE_GEMINI_AI_API_KEY=your-key-here
   ```

4. `npm run dev` and open http://localhost:5173

## Notes

- Trip generation needs a Gemini key; everything else (browsing the sample trip, saved trips) works without one.
- API quota stays with whoever supplies the key, which keeps the deployed demo free to host.
