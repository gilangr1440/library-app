import { ResponsePayload } from "../../types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Book, Books } from "./types";

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
