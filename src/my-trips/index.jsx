import { useEffect, useState } from "react";
import UserTripCardItem from "./components/UserTripCardItem";
import { getTraveler, listTrips } from "@/service/tripStore";
import TravelerDialog from "@/components/custom/TravelerDialog";

const MyTrips = () => {
  const [traveler, setTraveler] = useState(getTraveler());
  const [askName, setAskName] = useState(false);
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    if (!traveler) {
      setAskName(true);
      return;
    }
    setUserTrips(listTrips(traveler.name).filter((t) => t.traveler !== "sample"));
  }, [traveler]);

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-36">
      <h2 className="text-center text-4xl font-bold">
        {traveler ? `${traveler.name}'s trips` : "My trips"}
      </h2>
      {userTrips.length === 0 && traveler && (
        <p className="mt-10 text-center text-gray-500">
          Nothing planned yet - your generated trips will show up here.
        </p>
      )}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userTrips.map((trip) => (
          <UserTripCardItem trip={trip} key={trip.id} />
        ))}
      </div>
      <TravelerDialog
        open={askName}
        onDone={(t) => {
          setAskName(false);
          setTraveler(t);
        }}
      />
    </div>
  );
};

export default MyTrips;
