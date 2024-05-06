import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getBooksSorted } from "../../utils/apis/books/api";
import { Books } from "../../utils/apis/books/types";
import { getBorrows } from "../../utils/apis/borrows/api";
import { Borrows } from "../../utils/apis/borrows/types";

const Dashboard = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tab = urlParams.get("tab");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalBorrow, setShowModalBorrow] = useState<boolean>(false);
  const [bookDatas, setBookDatas] = useState<Books[]>([]);
  const [borrowDatas, setBorrowDatas] = useState<Borrows[]>([]);
  let no: number = 1;

  // Book pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage: number = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = bookDatas.slice(firstIndex, lastIndex);
  const npage = Math.ceil(bookDatas.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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

  // Borrow pagination
  const [currentPageBorrow, setCurrentPageBorrow] = useState<number>(1);
  const recordsPerPageBorrow: number = 10;
  const lastIndexBorrow = currentPageBorrow * recordsPerPageBorrow;
  const firstIndexBorrow = lastIndexBorrow - recordsPerPageBorrow;
  const recordsBorrow = borrowDatas.slice(firstIndexBorrow, lastIndexBorrow);
  const npageBorrow = Math.ceil(borrowDatas.length / recordsPerPageBorrow);
  const numbersBorrow = [...Array(npageBorrow + 1).keys()].slice(1);

  function prePageBorrow() {
    if (currentPageBorrow !== 1) {
      setCurrentPage(currentPageBorrow - 1);
    }
  }

  function changeCPageBorrow(id: number) {
    setCurrentPageBorrow(id);
  }

  function nextPageBorrow() {
    if (currentPageBorrow !== npageBorrow) {
      setCurrentPage(currentPageBorrow + 1);
    }
  }

  useEffect(() => {
    getAllBooks("New");
    getAllBorrows();
  }, []);

  const getAllBooks = async (sort?: string | null) => {
    try {
      const result = await getBooksSorted(sort, 1000);
      setBookDatas(result.payload.datas);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBorrows = async () => {
    try {
      const result = await getBorrows();
      setBorrowDatas(result.payload.datas);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <Layout>
      <div className="py-28">
        <div className="w-36 mx-auto">
          <ul className="flex justify-between text-sm text-gray-600 font-semibold bg-gray-200 px-1 py-1 rounded-md">
            <li className={`hover:bg-white hover:text-black hover:shadow-sm ${tab == "books" ? "bg-white text-black shadow-sm" : ""} p-1 rounded-md cursor-pointer`}>
              <Link to="/dashboard?tab=books">Books</Link>
            </li>
            <li className={`hover:bg-white hover:text-black hover:shadow-sm ${tab == "borrows" ? "bg-white text-black shadow-sm" : ""} p-1 rounded-md cursor-pointer`}>
              <Link to="/dashboard?tab=borrows">Borrows</Link>
            </li>
          </ul>
        </div>

        {tab == "books" ? (
          <>
            <div className="flex justify-end gap-3 mx-10 my-10">
              <input type="text" className="border border-gray-300 focus:outline focus:outline-offset-2 focus:outline-2 w-80 p-2 rounded-md text-sm" placeholder="Search" />
              <button
                className="text-sm text-white bg-black rounded-md p-2"
                onClick={() => {
                  setShowModal((prev) => !prev);
                }}
              >
                Add
              </button>
            </div>

            <div className="relative overflow-x-auto mx-10">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ISBN
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Featured
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {records &&
                    records.map((data: Books, index: number) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{no++}</td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {data.title}
                        </th>
                        <td className="px-6 py-4">{data.author}</td>
                        <td className="px-6 py-4">{data.category}</td>
                        <td className="px-6 py-4">{data.isbn}</td>
                        <td className="px-6 py-4">{data.featured}</td>
                        <td className="px-6 py-4 flex gap-3">
                          <IoPencil
                            className="text-3xl text-black"
                            onClick={() => {
                              setShowModal((prev) => !prev);
                            }}
                          />
                          <IoTrashOutline className="text-3xl text-black" />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
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
          </>
        ) : (
          <>
            <div className="flex justify-end gap-3 mx-10 my-10">
              <input type="text" className="border border-gray-300 focus:outline focus:outline-offset-2 focus:outline-2 w-80 p-2 rounded-md text-sm" placeholder="Search" />
            </div>

            <div className="relative overflow-x-auto mx-10">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Book
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Borrow Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Return Date
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {recordsBorrow &&
                    recordsBorrow.map((data: Borrows, index: number) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{no++}</td>
                        <td className="px-6 py-4">{data.user.full_name}</td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {data.book.title}
                        </th>
                        <td className="px-6 py-4">{data.borrow_date}</td>
                        <td className="px-6 py-4">{data.due_date}</td>
                        <td className="px-6 py-4">{data.return_date}</td>
                        <td className="px-6 py-4 flex gap-3">
                          <IoPencil
                            className="text-3xl text-black"
                            onClick={() => {
                              setShowModalBorrow((prev) => !prev);
                            }}
                          />
                          <IoTrashOutline className="text-3xl text-black" />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-3 my-10">
              <span onClick={prePageBorrow} className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
                <FaChevronLeft />
              </span>
              {numbersBorrow.map((n, i) => (
                <span
                  key={i}
                  onClick={() => changeCPageBorrow(n)}
                  className={`w-10 h-10 border border-gray-200 ${currentPageBorrow === n ? "bg-gray-500 text-white" : ""} rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer`}
                >
                  {n}
                </span>
              ))}
              <span onClick={nextPageBorrow} className="w-10 h-10 border border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
                <FaChevronRight />
              </span>
            </div>
          </>
        )}

        <div className={`bg-white/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 ${showModal ? "flex" : "hidden"} justify-center items-center w-full md:inset-0 max-h-full h-screen`}>
          <div className={`relative z-[999] p-4 w-full max-w-md max-h-full`}>
            <div className="relative bg-white rounded-lg shadow-lg h-[500px] dark:bg-gray-700 overflow-y-scroll add-book-modal">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Book</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setShowModal((prev) => !prev);
                  }}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Title Book
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Title Book"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Cover Image
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id="cover" type="file"></input>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Author"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="isbn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      ISBN
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      id="isbn"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="ISBN"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Category
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected>Select category</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Romance">Romance</option>
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Business">Business</option>
                      <option value="Children">Children</option>
                      <option value="Thiller">Thiller</option>
                      <option value="Biography">Biography</option>
                      <option value="Religion">Religion</option>
                      <option value="Cookbooks">Cookbooks</option>
                      <option value="Horror">Horror</option>
                      <option value="Psychology">Psychology</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-black hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-white/70 dark:focus:ring-black"
                >
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                  </svg>
                  Add book
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={`bg-white/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 ${showModalBorrow ? "flex" : "hidden"} justify-center items-center w-full md:inset-0 max-h-full h-screen`}>
          <div className={`relative z-[999] p-4 w-full max-w-md max-h-full`}>
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-scroll add-book-modal">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Borrow</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setShowModalBorrow((prev) => !prev);
                  }}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="borrowdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Borrow Date
                    </label>
                    <input
                      type="date"
                      name="borrowdate"
                      id="borrowdate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="duedate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="duedate"
                      id="duedate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="returndate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Return Date
                    </label>
                    <input
                      type="date"
                      name="returndate"
                      id="returndate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-black hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-white/70 dark:focus:ring-black"
                >
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                  </svg>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
