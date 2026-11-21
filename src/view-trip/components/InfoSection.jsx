import PlaceImage from "@/components/custom/PlaceImage";
import { FaCalendarAlt, FaWallet, FaUsers, FaMapMarked } from "react-icons/fa";

const InfoSection = ({ trip }) => {
  const destination = trip?.userChoice?.location?.label;
  return (
    <div className="mx-4 mt-10 flex flex-col items-center gap-6 rounded-xl bg-white p-6 shadow-md sm:flex-row sm:justify-between md:mx-16 lg:mx-48">
      <PlaceImage
        className="h-40 w-40 rounded-full object-cover"
        query={destination}
        icon={FaMapMarked}
      />
      <div className="flex flex-col items-center sm:items-end">
        <div className="mb-2 text-3xl font-bold md:text-4xl">{destination}</div>
        <div className="mb-1 text-xl">
          <FaCalendarAlt className="mr-2 inline text-teal-700" /> <span className="font-semibold">Duration:</span>{" "}
          {trip?.userChoice?.noOfDays} days
        </div>
        <div className="mb-1 text-xl">
          <FaWallet className="mr-2 inline text-teal-700" /> <span className="font-semibold">Budget:</span>{" "}
          {trip?.userChoice?.budget}
        </div>
        <div className="text-xl">
          <FaUsers className="mr-2 inline text-teal-700" /> <span className="font-semibold">Travelling:</span>{" "}
          {trip?.userChoice?.noOfPeople}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
