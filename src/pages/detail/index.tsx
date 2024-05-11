import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { getBookById } from "../../utils/apis/books/api";
import { useEffect, useState } from "react";
import { Book } from "../../utils/apis/books/types";
import { FaPlus } from "react-icons/fa6";
import { useCartStore } from "../../utils/stores/cart-store";
import { useShallow } from "zustand/react/shallow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState<Partial<Book>>({});
  const [borrow, addBorrow] = useCartStore(useShallow((state) => [state.borrow, state.addBorrow]));

  useEffect(() => {
    getBookData(Number(id));
  });

  const getBookData = async (id: number) => {
    try {
      const result = await getBookById(id);
      setBookData(result.payload);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const addToCartHandle = () => {
    let duplicate = false;
    borrow.map((data: any) => {
      if (data.id == bookData.id) {
        console.log("data already exist");
        duplicate = true;
      }
    });
    if (!duplicate) {
      addBorrow({
        cover_image: bookData.cover_image,
        id: bookData.id,
        title: bookData.title,
      });
      toast.success(`book added`, {
        position: "bottom-right",
        containerId: "bookadded",
      });
    } else {
      toast.error(`book has already exist`, {
        position: "bottom-right",
        containerId: "bookexist",
      });
    }
  };

  return (
    <Layout>
      <ToastContainer autoClose={2000} containerId={"bookexist"} />
      <ToastContainer autoClose={2000} containerId={"bookadded"} />
      <div className="py-32 flex flex-wrap mx-16 gap-10 items-center">
        <div className="w-[350px] h-[530px]">
          <img src={bookData.cover_image} className="w-full h-full object-cover" alt="cover-book" />
        </div>
        <div className="w-[830px]">
          <h1 className="text-2xl dark:text-white font-bold mb-3">{bookData.title}</h1>
          <h3 className="text-sm text-gray-500 mb-3">by {bookData.author}</h3>
          <span className="bg-black text-white text-xs rounded-full p-1 mb-3">{bookData.category}</span>
          <hr className="my-8" />
          <p className="text-justify dark:text-white mb-3">{bookData.description}</p>
          <button onClick={addToCartHandle} className="flex justify-center items-center gap-2 p-2 bg-black hover:bg-gray-700 text-white rounded-md text-sm">
            Add to cart <FaPlus />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
