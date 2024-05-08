import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addBook, deleteBook, editBook, getBookById, getBooksSorted } from "../../utils/apis/books/api";
import { Book, Books, BooksType } from "../../utils/apis/books/types";
import { deleteBorrow, editBorrow, getBorrows } from "../../utils/apis/borrows/api";
import { BorrowType, Borrows } from "../../utils/apis/borrows/types";
import AddBook from "./module/add-book";
import EditBook from "./module/edit-book";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBorrow from "./module/edit-borrow";

const Dashboard = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tab = urlParams.get("tab");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalBorrow, setShowModalBorrow] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<number>();
  const [idBorrow, setIdBorrow] = useState<number>();
  const [bookDatas, setBookDatas] = useState<Books[]>([]);
  const [detailBook, setDetailBook] = useState<Book>();
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

  const handleAddBook = async (body: BooksType) => {
    try {
      const result = await addBook(body);
      toast.info(`${result.message}`, {
        position: "bottom-right",
        containerId: "addbook",
      });
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const handleEditBook = async (body: BooksType) => {
    console.log(body);
    try {
      const result = await editBook(body, idEdit!);
      toast.success(`${result.message}`, {
        position: "bottom-right",
        containerId: "editbook",
      });
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const onEditBook = async (open: boolean, id: number) => {
    try {
      const response = await getBookById(id);
      setDetailBook(response.payload);
      setShowModalEdit(open);
      setIdEdit(id);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      const result = await deleteBook(id);
      toast.error(`${result.message}`, {
        position: "bottom-right",
        containerId: "deletebook",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onEditBorrow = (open: boolean, id: number) => {
    setShowModalBorrow(open);
    setIdBorrow(id);
  };

  const handleEditBorrow = async (body: BorrowType) => {
    try {
      const result = await editBorrow(body, idBorrow!);
      toast.success(`${result.message}`, {
        position: "bottom-right",
        containerId: "editborrow",
      });
    } catch (error: any) {
      console.log(error.result);
    }
  };

  const handleDeleteBorrow = async (id: number) => {
    try {
      const result = await deleteBorrow(id);
      toast.error(`${result.message}`, {
        position: "bottom-right",
        containerId: "deleteborrow",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ToastContainer autoClose={false} containerId={"editbook"} />
      <ToastContainer autoClose={false} containerId={"addbook"} />
      <ToastContainer autoClose={false} containerId={"deletebook"} />
      <ToastContainer autoClose={false} containerId={"editborrow"} />
      <ToastContainer autoClose={false} containerId={"deleteborrow"} />

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
                className="text-sm text-white bg-black dark:bg-gray-300 dark:text-black rounded-md p-2"
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
                            className="text-3xl text-black dark:text-white cursor-pointer"
                            onClick={() => {
                              onEditBook(true, data.id);
                            }}
                          />
                          <IoTrashOutline
                            className="text-3xl text-black dark:text-white cursor-pointer"
                            onClick={() => {
                              confirm("do you want to delete this book?") && handleDeleteBook(data.id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-3 my-10">
              <span onClick={prePage} className="w-10 h-10 border dark:text-white border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
                <FaChevronLeft />
              </span>
              {numbers.map((n, i) => (
                <span
                  key={i}
                  onClick={() => changeCPage(n)}
                  className={`w-10 h-10 border dark:text-white border-gray-200 ${currentPage === n ? "bg-gray-500 text-white" : ""} rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer`}
                >
                  {n}
                </span>
              ))}
              <span onClick={nextPage} className="w-10 h-10 border dark:text-white border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
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
                            className="text-3xl text-black dark:text-white cursor-pointer"
                            onClick={() => {
                              onEditBorrow(true, data.id);
                            }}
                          />
                          <IoTrashOutline
                            className="text-3xl text-black dark:text-white cursor-pointer"
                            onClick={() => {
                              confirm("do you want to delete this data?") && handleDeleteBorrow(data.id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-3 my-10">
              <span onClick={prePageBorrow} className="w-10 h-10 border dark:text-white border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
                <FaChevronLeft />
              </span>
              {numbersBorrow.map((n, i) => (
                <span
                  key={i}
                  onClick={() => changeCPageBorrow(n)}
                  className={`w-10 h-10 border dark:text-white border-gray-200 ${currentPageBorrow === n ? "bg-gray-500 text-white" : ""} rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer`}
                >
                  {n}
                </span>
              ))}
              <span onClick={nextPageBorrow} className="w-10 h-10 border dark:text-white border-gray-200 rounded-md flex justify-center items-center hover:bg-gray-200 cursor-pointer">
                <FaChevronRight />
              </span>
            </div>
          </>
        )}

        {showModal ? <AddBook onSubmit={handleAddBook} close={() => setShowModal((prev) => !prev)} /> : showModalEdit ? <EditBook data={detailBook!} close={() => setShowModalEdit(false)} onSubmit={handleEditBook} /> : null}

        {showModalBorrow ? <EditBorrow onSubmit={handleEditBorrow} close={() => setShowModalBorrow((prev) => !prev)} /> : null}
      </div>
    </Layout>
  );
};

export default Dashboard;
