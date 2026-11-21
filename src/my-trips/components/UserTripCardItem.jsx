import PlaceImage from "@/components/custom/PlaceImage";
import { FaMapMarked } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const destination = trip?.userChoice?.location?.label;
  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="transition-all hover:scale-105 hover:shadow-md">
        <PlaceImage
          className="mx-auto h-64 w-full rounded-xl object-cover"
          query={destination}
          icon={FaMapMarked}
        />
        <h2 className="mt-2 text-lg font-bold">{destination}</h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userChoice?.noOfDays} days · {trip?.userChoice?.budget} ·{" "}
          {trip?.userChoice?.noOfPeople}
        </h2>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
