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

export const editUser = async (body: IUserType) => {
  try {
    const formData = new FormData();

    formData.append("email", body.email);
    formData.append("full_name", body.full_name);
    formData.append("phone_number", body.phone_number);
    formData.append("address", body.address);

    if (body.password != undefined) {
      formData.append("password", body.password);
    }

    if (body.profile_picture.length > 0) {
      formData.append("profile_picture", body.profile_picture[0]);
    }

    const response = await axiosWithConfig.put("users", formData);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response;
  }
};

export const deleteUser = async () => {
  try {
    const response = await axiosWithConfig.delete("users");
    return response.data as { message: string };
  } catch (error: any) {
    return error.reponse;
  }
};
