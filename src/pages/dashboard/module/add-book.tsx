import { useEffect } from "react";
import { BooksType, booksSchema } from "../../../utils/apis/books/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddBookProps {
  close: () => void;
  onSubmit: (data: BooksType) => void;
}

const AddBook = ({ close, onSubmit }: AddBookProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<BooksType>({
    resolver: zodResolver(booksSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      close();
    }
  }, [isSubmitSuccessful]);

  return (
    <div className={`bg-white/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full h-screen`}>
      <div className={`relative z-[999] p-4 w-full max-w-md max-h-full`}>
        <div className="relative bg-white rounded-lg shadow-lg h-[500px] dark:bg-gray-700 overflow-y-scroll add-book-modal">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Book</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={close}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title Book
                </label>
                <input
                  type="text"
                  id="title"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                    !errors.title && "mb-8"
                  }`}
                  {...register("title")}
                  placeholder="Title Book"
                />
                <p className="text-sm text-red-500 mb-8">{errors.title && errors.title.message}</p>
              </div>
              <div className="col-span-2">
                <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Cover Image
                </label>
                <input
                  id="cover"
                  type="file"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${!errors.cover_image && "mb-8"}`}
                  {...register("cover_image")}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                    !errors.author && "mb-8"
                  }`}
                  {...register("author")}
                  placeholder="Author"
                />
                <p className="text-sm text-red-500 mb-8">{errors.author && errors.author.message}</p>
              </div>
              <div className="col-span-2">
                <label htmlFor="isbn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                    !errors.isbn && "mb-8"
                  }`}
                  {...register("isbn")}
                  placeholder="ISBN"
                />
                <p className="text-sm text-red-500 mb-8">{errors.isbn && errors.isbn.message}</p>
              </div>
              <div className="col-span-2">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <select
                  id="category"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                    !errors.category && "mb-8"
                  }`}
                  {...register("category")}
                >
                  <option selected value="">
                    Select category
                  </option>
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
                <p className="text-sm text-red-500 mb-8">{errors.category && errors.category.message}</p>
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    !errors.description && "mb-8"
                  }`}
                  {...register("description")}
                  placeholder="Description"
                ></textarea>
                <p className="text-sm text-red-500 mb-8">{errors.description && errors.description.message}</p>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-black hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-white/70 dark:focus:ring-black"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
              </svg>
              Add book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
