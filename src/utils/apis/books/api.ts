import { ResponsePayload } from "../../types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Books } from "./types";

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get("books?limit=8");
    return response.data as ResponsePayload<Books[]>;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getBooksSorted = async (sort?: string, pageLimit?: number) => {
  try {
    const response = await axiosWithConfig.get(`books?limit=${pageLimit || 8}&sort=${sort}`);
    return response.data as ResponsePayload<Books[]>;
  } catch (error: any) {
    return error.response.data;
  }
};
