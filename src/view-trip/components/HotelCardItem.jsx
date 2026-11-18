import PlaceImage from "@/components/custom/PlaceImage";
import { CiStar } from "react-icons/ci";

const HotelCardItem = ({ h, destination }) => {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${h?.name}, ${h?.address || ""}`);
  return (
    <a href={mapsUrl} target="_blank" rel="noreferrer">
      <div className="flex flex-col items-center justify-center">
        <PlaceImage
          className="h-52 w-80 rounded-md object-cover"
          query={`${h?.name}, ${destination || ""}`}
          emoji="🏨"
        />
        <div className="mt-2 flex w-full items-center justify-between px-6">
          <div className="font-bold">{h.name}</div>
          <div className="flex items-center">
            {h.rating}
            <CiStar />
          </div>
        </div>
        <div className="my-1 w-full px-6 text-sm text-gray-600">{h.address}</div>
      </div>
    </a>
  );
};

export default HotelCardItem;
