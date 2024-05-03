import axiosWithConfig from "../axiosWithConfig";

export const getBorrows = async () => {
  try {
    const response = await axiosWithConfig.get("borrows?limit=100");
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};
