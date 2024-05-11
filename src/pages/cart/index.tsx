import { useShallow } from "zustand/react/shallow";
import Layout from "../../components/Layout";
import { useCartStore } from "../../utils/stores/cart-store";
import { BorrowCartType } from "../../utils/apis/borrows/types";
import { IoTrashOutline } from "react-icons/io5";
import { addBorrow } from "../../utils/apis/borrows/api";

const Cart = () => {
  const [borrow, deleteBorrow] = useCartStore(useShallow((state) => [state.borrow, state.deleteBorrow]));
  let no: number = 1;

  const handleDeleteCart = (id: number | undefined) => {
    const deleteCart = borrow.filter((borr: BorrowCartType) => borr.id !== id);
    deleteBorrow(deleteCart);
  };

  return (
    <Layout>
      <div className="py-32">
        <div className="relative w-4/5 mx-auto overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Book Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Cover
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {borrow &&
                borrow.map((data: BorrowCartType, index: number) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {no++}
                    </th>
                    <td className="px-6 py-4">{data.title}</td>
                    <td className="px-6 py-4">
                      <img src={data.cover_image} alt="cover" className="w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <IoTrashOutline onClick={() => handleDeleteCart(data.id)} className="text-3xl text-black dark:text-white cursor-pointer" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
