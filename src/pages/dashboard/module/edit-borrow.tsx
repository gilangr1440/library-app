import { useEffect } from "react";
import { BorrowType } from "../../../utils/apis/borrows/types";
import { useForm } from "react-hook-form";

interface EditBorrowProps {
  close: () => void;
  onSubmit: (data: BorrowType) => void;
}

const EditBorrow = ({ close, onSubmit }: EditBorrowProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<BorrowType>({
    defaultValues: {
      borrow_date: "",
      due_date: "",
      return_date: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      close();
    }
  }, [isSubmitSuccessful]);

  return (
    <div className={`bg-white/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full h-screen`}>
      <div className={`relative z-[999] p-4 w-full max-w-md max-h-full`}>
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 overflow-y-scroll add-book-modal">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Borrow</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={close}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="borrowdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Borrow Date
                </label>
                <input
                  type="date"
                  id="borrowdate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...register("borrow_date")}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="duedate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Due Date
                </label>
                <input
                  type="date"
                  id="duedate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...register("due_date")}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="returndate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returndate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  {...register("return_date")}
                />
              </div>
            </div>
            <button
              className="text-white inline-flex items-center bg-black hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-white/70 dark:focus:ring-black"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
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
  );
};

export default EditBorrow;
