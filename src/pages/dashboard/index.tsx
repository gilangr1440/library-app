import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tab = urlParams.get("tab");
  console.log(tab);
  return (
    <Layout>
      <div className="py-28">
        <div className="w-36 mx-auto">
          <ul className="flex justify-between text-sm text-gray-600 font-semibold bg-gray-200 px-2 py-1 rounded-md">
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
              <button className="text-sm text-white bg-black rounded-md p-2">Add</button>
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
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">1</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      To Kill a Mockingbird
                    </th>
                    <td className="px-6 py-4">Harper Lee</td>
                    <td className="px-6 py-4">Fiction</td>
                    <td className="px-6 py-4">978-0-06-112008-4</td>
                    <td className="px-6 py-4">true</td>
                    <td className="px-6 py-4 flex gap-3">
                      <IoPencil className="text-3xl text-black" />
                      <IoTrashOutline className="text-3xl text-black" />
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">1</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      To Kill a Mockingbird
                    </th>
                    <td className="px-6 py-4">Harper Lee</td>
                    <td className="px-6 py-4">Fiction</td>
                    <td className="px-6 py-4">978-0-06-112008-4</td>
                    <td className="px-6 py-4">true</td>
                    <td className="px-6 py-4 flex gap-3">
                      <IoPencil className="text-3xl text-black" />
                      <IoTrashOutline className="text-3xl text-black" />
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">1</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      To Kill a Mockingbird
                    </th>
                    <td className="px-6 py-4">Harper Lee</td>
                    <td className="px-6 py-4">Fiction</td>
                    <td className="px-6 py-4">978-0-06-112008-4</td>
                    <td className="px-6 py-4">true</td>
                    <td className="px-6 py-4 flex gap-3">
                      <IoPencil className="text-3xl text-black" />
                      <IoTrashOutline className="text-3xl text-black" />
                    </td>
                  </tr>
                </tbody>
              </table>
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
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">Devanada</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      To Kill a Mockingbird
                    </th>
                    <td className="px-6 py-4">Sun, 05 Nov 2023</td>
                    <td className="px-6 py-4">Sun, 12 Nov 2023</td>
                    <td className="px-6 py-4">Sun, 12 Nov 2023</td>
                    <td className="px-6 py-4 flex gap-3">
                      <IoPencil className="text-3xl text-black" />
                      <IoTrashOutline className="text-3xl text-black" />
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">Devanada</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      To Kill a Mockingbird
                    </th>
                    <td className="px-6 py-4">Sun, 05 Nov 2023</td>
                    <td className="px-6 py-4">Sun, 12 Nov 2023</td>
                    <td className="px-6 py-4">Sun, 12 Nov 2023</td>
                    <td className="px-6 py-4 flex gap-3">
                      <IoPencil className="text-3xl text-black" />
                      <IoTrashOutline className="text-3xl text-black" />
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">Devanada</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      To Kill a Mockingbird
                    </th>
                    <td className="px-6 py-4">Sun, 05 Nov 2023</td>
                    <td className="px-6 py-4">Sun, 12 Nov 2023</td>
                    <td className="px-6 py-4">Sun, 12 Nov 2023</td>
                    <td className="px-6 py-4 flex gap-3">
                      <IoPencil className="text-3xl text-black" />
                      <IoTrashOutline className="text-3xl text-black" />
                    </td>
                  </tr>
                </tbody>
              </table>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
