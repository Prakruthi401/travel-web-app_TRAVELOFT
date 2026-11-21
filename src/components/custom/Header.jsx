import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import TravelerDialog from "./TravelerDialog";
import { getTraveler, setTraveler } from "@/service/tripStore";
import { FaCompass } from "react-icons/fa";

const Header = () => {
  const [traveler, setTravelerState] = useState(getTraveler());
  const [askName, setAskName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setTravelerState(getTraveler());
    window.addEventListener("traveloft-traveler", sync);
    return () => window.removeEventListener("traveloft-traveler", sync);
  }, []);

  const switchTraveler = () => {
    setTraveler(null);
    setTravelerState(null);
    setAskName(true);
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 shadow-sm bg-white/95 sticky top-0 z-30">
      <Link to="/" className="flex items-center gap-2 select-none">
        <FaCompass className="text-2xl text-teal-700" />
        <span className="text-2xl font-extrabold tracking-tight text-teal-700">
          TravelOft
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {traveler ? (
          <>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => navigate("/my-trip")}
            >
              My trips
            </Button>
            <button
              onClick={switchTraveler}
              title="Switch traveler"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white"
            >
              {traveler.name?.[0]?.toUpperCase()}
            </button>
          </>
        ) : (
          <Button className="rounded-full" onClick={() => setAskName(true)}>
            Start planning
          </Button>
        )}
      </div>

      <TravelerDialog
        open={askName}
        onDone={(t) => {
          setAskName(false);
          setTravelerState(t);
        }}
      />
    </header>
  );
};

export default Header;
