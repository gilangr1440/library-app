import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { MdExpandMore } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import Cards from "../../components/Cards";
import { getBooksSorted } from "../../utils/apis/books/api";
import { Link, useLocation } from "react-router-dom";
import { Books } from "../../utils/apis/books/types";

const NewReleaseBooks = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const sort = urlParams.get("sort");
  const [bookDatas, setBookDatas] = useState<Books[]>([]);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage: number = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = bookDatas.slice(firstIndex, lastIndex);
  const npage = Math.ceil(bookDatas.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    getAllBooks(sort);
  }, [sort]);

  const getAllBooks = async (sort?: string | null) => {
    try {
      const result = await getBooksSorted(sort, 1000);
      setBookDatas(result.payload.datas);
    } catch (error) {
      console.log(error);
    }
  };

  window.addEventListener("click", (e: any) => {
    if (!e.target.className.split(" ").includes("sort-field")) {
      setSortOpen(false);
    }
  });

  return (
    <Layout>
      <div className="py-28">
        <div className="absolute right-0 mx-10">
          <button
            className="sort-field bg-white flex items-center justify-between p-2 border border-gray-300 rounded-md w-44 text-sm mb-1"
            onClick={() => {
              setSortOpen((prev) => !prev);
            }}
          >
            Sort by <MdExpandMore className="text-xl" />
          </button>
          <div className={`sort-field bg-white ${sortOpen ? "block" : "hidden"} p-2 border border-gray-300 rounded-md text-sm`}>
            <ul className="sort-field">
              <Link to={"/new?sort=New"}>
                <li className="p-1 hover:bg-gray-300 flex items-center gap-2 cursor-pointer rounded-md">
                  <FaCheck className={`${sort === "New" ? "opacity-100" : "opacity-0"}`} />
                  New
                </li>
              </Link>
              <Link to={"/new?sort=default"}>
                <li className="p-1 hover:bg-gray-300 flex items-center gap-2 cursor-pointer rounded-md">
                  <FaCheck className={`${sort === "default" ? "opacity-100" : "opacity-0"}`} />
                  Default
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-5 justify-items-center mt-20">{records && records.map((data: Books, index: number) => <Cards key={index} id={data.id} img={data.cover_image} title={data.title} author={data.author} />)}</div>

        <div className="flex justify-center gap-3 my-10">
          <span onClick={prePage} className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
            <FaChevronLeft />
          </span>
          {numbers.map((n, i) => (
            <span key={i} onClick={() => changeCPage(n)} className={`w-10 h-10 border border-gray-200 ${currentPage === n ? "bg-gray-500 text-white" : ""} rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer`}>
              {n}
            </span>
          ))}
          <span onClick={nextPage} className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
            <FaChevronRight />
          </span>
        </div>
      </div>
    </Layout>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id: number) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default NewReleaseBooks;
