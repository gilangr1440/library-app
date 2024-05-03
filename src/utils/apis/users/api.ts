import { ResponsePayload } from "../../types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IUserType } from "./types";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("users");
    return response.data as { message: string; payload: IUserType };
  } catch (error: any) {
    return error.response;
  }
};
