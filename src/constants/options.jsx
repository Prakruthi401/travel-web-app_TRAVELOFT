export const SelectTravelList = [
  {
    id: 1,
    title: "Just me",
    desc: "Solo, at my own pace",
    icon: "🎒",
    people: "1 person",
  },
  {
    id: 2,
    title: "The two of us",
    desc: "A trip for two",
    icon: "💑",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "Kids, parents, everyone",
    icon: "🏠",
    people: "3 to 4 people",
  },
  {
    id: 4,
    title: "The gang",
    desc: "Friends trip, chaos included",
    icon: "🧑‍🤝‍🧑",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Shoestring",
    desc: "Hostels, buses, street food",
    icon: "💸",
  },
  {
    id: 2,
    title: "Comfortable",
    desc: "Decent stays, no splurging",
    icon: "💵",
  },
  {
    id: 3,
    title: "Treat us",
    desc: "The good stuff, within reason",
    icon: "💎",
  },
];

export const AI_PROMPT = `Generate a travel plan for the destination: {location} for {totalDays} days.
Traveler type: {traveler}, with a {budget} budget.
Give me a list of hotel options with name, address, geo coordinates, rating and a one-line description.
Then a day-by-day itinerary for {totalDays} days: each day has a best time to start and a list of places with
placeName, placeDetails (one line), geoCoordinates, ticketPricing, rating and timeTravel (how long the visit takes).
Use real, currently existing hotels and places only. Quote all ticket prices in INR (₹).
Reply with JSON only in exactly this shape:
{"hotel": [...], "itinerary": [{"day": "Day 1", "bestTime": "...", "plan": [...]}]}`;
