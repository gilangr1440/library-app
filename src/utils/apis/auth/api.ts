import axiosWithConfig from "../axiosWithConfig";
import { RegisterType } from "./types";

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
