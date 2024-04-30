import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";
import { Books } from "../utils/apis/books/types";
import { getBooks } from "../utils/apis/books/api";

const Slider = () => {
  const [bookDatas, setBookDatas] = useState<Books[]>([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      const result = await getBooks();
      setBookDatas(result.payload.datas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {bookDatas &&
          bookDatas.map(
            (data: any, index: number) =>
              index % 2 == 0 &&
              index <= 5 && (
                <SwiperSlide key={index}>
                  <div className="w-56 h-72 shadow-lg mb-4">
                    <img src={data.cover_image} className="w-full h-full object-cover" alt="cover" />
                  </div>
                  <div>
                    <h1 className="text-md font-bold mb-2 text-start">{data.title}</h1>
                    <h2 className="text-sm text-gray-500 text-start">{data.author}</h2>
                  </div>
                </SwiperSlide>
              )
          )}
      </Swiper>
    </>
  );
};

export default Slider;
