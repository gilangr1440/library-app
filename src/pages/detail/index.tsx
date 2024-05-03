import Layout from "../../components/Layout";
import bookcover from "../../assets/software-engineer-cover.jpg";
import { useParams } from "react-router-dom";
import { getBookById } from "../../utils/apis/books/api";
import { useEffect, useState } from "react";
import { Book } from "../../utils/apis/books/types";

const Detail = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState<Partial<Book>>({});

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

  return (
    <Layout>
      <div className="py-32 flex flex-wrap mx-16 gap-10 items-center">
        <div className="w-[350px] h-[530px]">
          <img src={bookData.cover_image} className="w-full h-full object-cover" alt="cover-book" />
        </div>
        <div className="w-[830px]">
          <h1 className="text-2xl font-bold mb-3">{bookData.title}</h1>
          <h3 className="text-sm text-gray-500 mb-3">by {bookData.author}</h3>
          <span className="bg-black text-white text-xs rounded-full p-1 mb-3">{bookData.category}</span>
          <hr className="my-8" />
          <p className="text-justify">{bookData.description}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
