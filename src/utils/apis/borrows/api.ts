import { ResponsePayload } from "../../types/api";
import axiosWithConfig from "../axiosWithConfig";
import { BorrowType, Borrows } from "./types";

export const getBorrows = async () => {
  try {
    const response = await axiosWithConfig.get("borrows?limit=100");
    return response.data as ResponsePayload<Borrows[]>;
  } catch (error: any) {
    return error.response.data;
  }
};

export const editBorrow = async (body: BorrowType, id: number) => {
  try {
    const response = await axiosWithConfig.put(`borrows/${id}`, body);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response;
  }
};

export const deleteBorrow = async (id: number) => {
  try {
    const response = await axiosWithConfig.delete(`borrows/${id}`);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response.data;
  }
};
