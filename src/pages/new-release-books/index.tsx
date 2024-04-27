import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { MdExpandMore } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cards from "../../components/Cards";
import bookcover from "../../assets/software-engineer-cover.jpg";

const NewReleaseBooks = () => {
  const [sortOpen, setSortOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(sortOpen);
  });

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
              <li className="sort-field p-1 hover:bg-gray-300 cursor-pointer rounded-md">New</li>
              <li className="sort-field p-1 hover:bg-gray-300 cursor-pointer rounded-md">Default</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-5 justify-items-center mt-20">
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
          <Cards img={bookcover} title={"Modern Software Engineering"} author={"David Farley"} />
        </div>

        <div className="flex justify-center gap-3 my-10">
          <span className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
            <FaChevronLeft />
          </span>
          <span className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">1</span>
          <span className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">2</span>
          <span className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
            <FaChevronRight />
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default NewReleaseBooks;
