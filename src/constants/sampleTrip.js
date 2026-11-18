// Bundled example so visitors (and recruiters) can see a full itinerary
// without needing an API key.
export const SAMPLE_TRIP = {
  id: "sample-hampi",
  traveler: "sample",
  userChoice: {
    location: { label: "Hampi, Karnataka, India" },
    noOfDays: 2,
    budget: "Shoestring",
    noOfPeople: "2 people",
  },
  tripData: {
    hotel: [
      {
        name: "Clarks Inn Hampi",
        address: "Near ASI Museum, Kamalapur, Hampi, Karnataka 583221",
        geoCoordinates: "15.3426, 76.4756",
        rating: 4.1,
        description: "Simple, clean rooms a short walk from the main ruins.",
      },
      {
        name: "Kishkinda Heritage Resort",
        address: "Sanapur Lake Road, Anegundi, Karnataka 583227",
        geoCoordinates: "15.3634, 76.4924",
        rating: 4.3,
        description: "Cottage-style stay across the river with coracle rides nearby.",
      },
      {
        name: "Gopi Guest House",
        address: "Hampi Bazaar, Hampi, Karnataka 583239",
        geoCoordinates: "15.3348, 76.4601",
        rating: 4.0,
        description: "Backpacker favourite with a rooftop looking at the temple.",
      },
    ],
    itinerary: [
      {
        day: "Day 1",
        bestTime: "Early morning",
        plan: [
          {
            placeName: "Virupaksha Temple, Hampi",
            placeDetails: "Living 7th-century temple on the Tungabhadra, still active.",
            geoCoordinates: "15.3353, 76.4586",
            ticketPricing: "₹50 (camera extra)",
            rating: 4.8,
            timeTravel: "1-2 hours",
          },
          {
            placeName: "Vijaya Vittala Temple, Hampi",
            placeDetails: "Stone chariot and musical pillars; the postcard shot of Hampi.",
            geoCoordinates: "15.3419, 76.4750",
            ticketPricing: "₹40 Indians / ₹600 foreign nationals",
            rating: 4.9,
            timeTravel: "2-3 hours",
          },
          {
            placeName: "Hampi Bazaar",
            placeDetails: "The old market street, good for a slow evening walk and dinner.",
            geoCoordinates: "15.3349, 76.4621",
            ticketPricing: "Free",
            rating: 4.4,
            timeTravel: "1-2 hours",
          },
        ],
      },
      {
        day: "Day 2",
        bestTime: "Sunrise",
        plan: [
          {
            placeName: "Matanga Hill, Hampi",
            placeDetails: "Short climb for sunrise over the whole boulder-strewn valley.",
            geoCoordinates: "15.3360, 76.4620",
            ticketPricing: "Free",
            rating: 4.7,
            timeTravel: "2 hours",
          },
          {
            placeName: "Lotus Mahal, Hampi",
            placeDetails: "Indo-Islamic pavilion inside the Zenana enclosure.",
            geoCoordinates: "15.3277, 76.4725",
            ticketPricing: "₹40 Indians / ₹600 foreign nationals",
            rating: 4.5,
            timeTravel: "1-2 hours",
          },
          {
            placeName: "Sanapur Lake",
            placeDetails: "Coracle rides between the boulders, quietest at sunset.",
            geoCoordinates: "15.3620, 76.4930",
            ticketPricing: "₹100-₹200 per coracle",
            rating: 4.6,
            timeTravel: "1-2 hours",
          },
        ],
      },
    ],
  },
};
