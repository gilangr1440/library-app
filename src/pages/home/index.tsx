import Layout from "../../components/Layout";
import bookicon from "../../assets/book-icon.png";
import Cards from "../../components/Cards";
import Slider from "../../components/Slider";
import { getBooks, getBooksSorted } from "../../utils/apis/books/api";
import { useEffect, useState } from "react";
import { Books } from "../../utils/apis/books/types";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [bookDatas, setBookDatas] = useState<Books[]>([]);
  const [bookDatasDefault, setBookDatasDefault] = useState<Books[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks();
    getAllBooksDefault();
  }, []);

  const getAllBooks = async () => {
    try {
      const result = await getBooksSorted("New");
      setBookDatas(result.payload.datas);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBooksDefault = async () => {
    try {
      const result = await getBooks();
      setBookDatasDefault(result.payload.datas);
    } catch (error) {
      console.log(error);
    }
  };

  const showAllHandling = (sort?: string) => {
    navigate(`/new?sort=${sort}`);
  };

  return (
    <Layout>
      <div className="dark:bg-gray-900">
        <div className="h-20 dark:bg-gray-900"></div>
        <div className="grid grid-cols-2 dark:bg-gray-900 items-center justify-items-center h-96">
          <div>
            <h1 className="text-5xl dark:text-white font-bold mb-2">Welcome to BookQuest</h1>
            <h2 className="text-xl text-gray-500 dark:text-gray-300 mb-3">Discover and borrow thousands of books at your fingertips.</h2>
            <button className="bg-black dark:bg-white hover:bg-gray-800 transition duration-300 text-sm text-white dark:text-gray-900 font-medium p-3 rounded-md">Get Started</button>
          </div>
          <div>
            <img src={bookicon} alt="book" width={200} />
          </div>
        </div>
        <div className="flex justify-between dark:bg-gray-900 px-10 mb-10">
          <h3 className="font-semibold dark:text-white text-xl">New Release Books</h3>
          <button className="text-sm p-2 dark:text-white" onClick={() => showAllHandling("New")}>
            show all
          </button>
        </div>
        <div className="h-96 dark:bg-gray-900 mx-auto mb-10">
          <Swiper slidesPerView={4} spaceBetween={30} freeMode={true} modules={[FreeMode]} className="mySwiper">
            <div className="grid grid-cols-4 justify-items-center mb-10">
              {bookDatas &&
                bookDatas.map((data: any, index: number) => (
                  <SwiperSlide className="card-slider">
                    <Cards key={index} id={data.id} img={data.cover_image} title={data.title} author={data.author} />
                  </SwiperSlide>
                ))}
            </div>
          </Swiper>
        </div>
        <div className="h-96 w-[95%] mx-auto mb-10">
          <Slider />
        </div>
        <div className="flex justify-between px-10 mb-10">
          <h3 className="font-semibold dark:text-white text-xl">Others</h3>
          <button className="text-sm dark:text-white p-2" onClick={() => showAllHandling("default")}>
            show all
          </button>
        </div>
        <div className="h-96 mx-auto mb-10">
          <Swiper slidesPerView={4} spaceBetween={30} freeMode={true} modules={[FreeMode]} className="mySwiper">
            <div className="grid grid-cols-4 justify-items-center mb-10">
              {bookDatasDefault &&
                bookDatasDefault.map((data: any, index: number) => (
                  <SwiperSlide className="card-slider">
                    <Cards key={index} id={data.id} img={data.cover_image} title={data.title} author={data.author} />
                  </SwiperSlide>
                ))}
            </div>
          </Swiper>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
