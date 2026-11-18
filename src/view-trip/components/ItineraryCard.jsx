import PlaceImage from "@/components/custom/PlaceImage";
import { CiStar } from "react-icons/ci";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const ItineraryCard = ({ plan, destination }) => {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${plan?.placeName}, ${destination || ""}`);
  return (
    <a href={mapsUrl} target="_blank" rel="noreferrer">
      <div className="itinerary-card flex transform flex-col overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105">
        <PlaceImage
          className="h-48 w-full object-cover"
          query={`${plan?.placeName}, ${destination || ""}`}
          emoji="📍"
        />
        <div className="p-4">
          <h4 className="mb-2 flex items-center text-xl font-semibold">
            <FaMapMarkerAlt className="mr-2 text-teal-600" />
            {plan.placeName}
          </h4>
          <p className="mb-2 flex items-center text-gray-700">
            <CiStar className="mr-1 text-yellow-500" />
            {plan.rating}
          </p>
          <p className="mb-1 flex items-center text-gray-600">
            <MdCurrencyRupee className="mr-1 text-green-600" />
            Tickets: {plan.ticketPricing}
          </p>
          <p className="mb-1 flex items-center text-gray-600">
            <FaClock className="mr-1 text-gray-500" />
            Time needed: {plan.timeTravel}
          </p>
          <p className="text-gray-600">{plan.placeDetails}</p>
        </div>
      </div>
    </a>
  );
};

export default ItineraryCard;
