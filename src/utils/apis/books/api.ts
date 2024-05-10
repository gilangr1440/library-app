import { ResponsePayload } from "../../types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Book, Books, BooksType } from "./types";

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get("books?limit=8");
    return response.data as ResponsePayload<Books[]>;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getBooksSorted = async (sort?: string | null, pageLimit?: number) => {
  try {
    const response = await axiosWithConfig.get(`books?limit=${pageLimit || 8}&sort=${sort}`);
    return response.data as ResponsePayload<Books[]>;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getBookById = async (id: number) => {
  try {
    const response = await axiosWithConfig.get(`books/${id}`);
    return response.data as { message: string; payload: Book };
  } catch (error: any) {
    return error.response.data;
  }
};

export const addBook = async (body: BooksType) => {
  const formData = new FormData();
  const featured = new Boolean(body.featured).toString();

  formData.append("title", body.title);
  formData.append("featured", featured);
  formData.append("cover_image", body.cover_image[0]);
  formData.append("author", body.author);
  formData.append("isbn", body.isbn);
  formData.append("category", body.category);
  formData.append("description", body.description);

  try {
    const response = await axiosWithConfig.post("books", formData);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response;
  }
};

export const editBook = async (body: BooksType, id: number) => {
  const formData = new FormData();
  const featured = new Boolean(body.featured).toString();

  formData.append("title", body.title);
  formData.append("featured", featured);
  formData.append("author", body.author);
  formData.append("isbn", body.isbn);
  formData.append("category", body.category);
  formData.append("description", body.description);
  if (body.cover_image.length !== 0) {
    formData.append("cover_image", body.cover_image[0]);
  }

  try {
    const response = await axiosWithConfig.put(`books/${id}`, formData);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response;
  }
};

export const deleteBook = async (id: number) => {
  try {
    const response = await axiosWithConfig.delete(`books/${id}`);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response;
  }
};

export const searchBook = async (keyword: string) => {
  try {
    const response = await axiosWithConfig.get(`books?query=${keyword}&limit=100`);
    return response.data as ResponsePayload<Books[]>;
  } catch (error: any) {
    return error.response;
  }
};
