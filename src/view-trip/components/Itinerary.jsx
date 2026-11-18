import ItineraryCard from "./ItineraryCard";

const Itinerary = ({ trip }) => {
  const destination = trip?.userChoice?.location?.label;
  return (
    <div className="container mx-auto w-full px-6 py-12 lg:w-4/5">
      <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
        Day by day
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(trip?.tripData?.itinerary || []).map((item, i) => (
          <div key={i} className="rounded-xl bg-teal-50/60 p-4 shadow-sm">
            <h3 className="mb-1 text-2xl font-semibold">{item?.day}</h3>
            {item?.bestTime && (
              <p className="mb-4 text-sm text-gray-500">
                Best start: {item.bestTime}
              </p>
            )}
            <div className="space-y-6">
              {item?.plan?.map((plan, index) => (
                <ItineraryCard plan={plan} destination={destination} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
