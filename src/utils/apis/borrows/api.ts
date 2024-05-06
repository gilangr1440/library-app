import { ResponsePayload } from "../../types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Borrows } from "./types";

export const getBorrows = async () => {
  try {
    const response = await axiosWithConfig.get("borrows?limit=100");
    return response.data as ResponsePayload<Borrows[]>;
  } catch (error: any) {
    return error.response.data;
  }
};
