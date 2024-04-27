import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import bookcover from "../assets/software-engineer-cover.jpg";

const Slider = () => {
  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="w-56 h-72 shadow-lg mb-4">
            <img src={bookcover} className="w-full h-full object-cover" alt="cover" />
          </div>
          <div>
            <h1 className="text-md font-bold mb-2 text-start">Modern Software Engineering</h1>
            <h2 className="text-sm text-gray-500 text-start">David Farley</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-56 h-72 shadow-lg mb-4">
            <img src={bookcover} className="w-full h-full object-cover" alt="cover" />
          </div>
          <div>
            <h1 className="text-md font-bold mb-2 text-start">Modern Software Engineering</h1>
            <h2 className="text-sm text-gray-500 text-start">David Farley</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-56 h-72 shadow-lg mb-4">
            <img src={bookcover} className="w-full h-full object-cover" alt="cover" />
          </div>
          <div>
            <h1 className="text-md font-bold mb-2 text-start">Modern Software Engineering</h1>
            <h2 className="text-sm text-gray-500 text-start">David Farley</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-56 h-72 shadow-lg mb-4">
            <img src={bookcover} className="w-full h-full object-cover" alt="cover" />
          </div>
          <div>
            <h1 className="text-md font-bold mb-2 text-start">Modern Software Engineering</h1>
            <h2 className="text-sm text-gray-500 text-start">David Farley</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
