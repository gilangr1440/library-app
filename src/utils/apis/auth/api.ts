import axiosWithConfig from "../axiosWithConfig";
import { LoginType, RegisterType } from "./types";

interface LoginPayload {
  token: string;
}

export const userRegister = async (body: RegisterType) => {
  const dynamicKey = "retype_password";
  const { [dynamicKey]: _, ...rest } = body;
  try {
    const response = await axiosWithConfig.post("register", rest);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response;
  }
};

export const userLogin = async (body: LoginType) => {
  try {
    const response = await axiosWithConfig.post("login", body);
    return response.data as { message: string; payload: LoginPayload };
  } catch (error: any) {
    return error.response.data;
  }
};
