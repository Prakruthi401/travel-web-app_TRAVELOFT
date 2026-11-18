import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getTrip } from "@/service/tripStore";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const found = getTrip(tripId);
    if (found) setTrip(found);
    else toast("No trip found in this browser");
  }, [tripId]);

  if (!trip) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-gray-500">
        Trip not found - it may have been planned in another browser.
      </div>
    );
  }

  return (
    <div className="w-full pb-12">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <Itinerary trip={trip} />
    </div>
  );
};

export default ViewTrip;
