import HotelCardItem from "./HotelCardItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hotels = ({ trip }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, trip?.tripData?.hotel?.length || 1),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const hotels = trip?.tripData?.hotel || [];
  const destination = trip?.userChoice?.location?.label;

  return (
    <div className="mx-4 mt-12 rounded-xl bg-white p-6 shadow-md md:mx-16 lg:mx-32">
      <div className="mb-8 text-center text-3xl font-bold md:text-4xl">
        Where to stay
      </div>
      <Slider {...settings}>
        {hotels.map((h, i) => (
          <div key={i} className="p-2">
            <HotelCardItem h={h} destination={destination} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hotels;
