import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { saveTrip, getTraveler, setTraveler } from "@/service/tripStore";
import { SAMPLE_TRIP } from "@/constants/sampleTrip";

const Hero = () => {
  const navigate = useNavigate();

  const openSample = () => {
    if (!getTraveler()) setTraveler({ name: "Explorer" });
    saveTrip(SAMPLE_TRIP);
    navigate(`/view-trip/${SAMPLE_TRIP.id}`);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] flex-col items-center justify-center overflow-hidden p-6 text-center">
      <img
        src={import.meta.env.BASE_URL + "bg.jpg"}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

      <div className="relative z-10 max-w-2xl">
        <h1 className="mb-4 text-4xl md:text-6xl font-extrabold text-white drop-shadow-md">
          Trips planned around you, not the other way round
        </h1>
        <p className="mb-2 text-lg md:text-xl font-medium text-white/90">
          TravelOft turns a destination, a budget and who's coming along into a
          day-by-day plan: where to stay, what to see, what tickets cost and
          how long each stop takes.
        </p>
        <p className="mb-8 text-lg md:text-xl font-medium text-white/90">
          Built on Google's Gemini. Priced in ₹, made for how we actually
          travel.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => navigate("/create-trip")}
            className="px-8 py-6 text-lg font-bold bg-teal-500 hover:bg-teal-600"
          >
            Plan my trip
          </Button>
          <Button
            variant="outline"
            onClick={openSample}
            className="px-8 py-6 text-lg font-semibold bg-white/90 hover:bg-white"
          >
            See a sample itinerary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
