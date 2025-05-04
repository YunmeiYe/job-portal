import axiosInstance from "../config/axiosInstance";
import store from "../store/store";
import { setLoading } from "../store/loadingSlice";

type RequestMethod = "get" | "post" | "put" | "delete";

const request = async <T = any>(method: RequestMethod, url: string, data?: any, options?: any): Promise<T> => {
  try {
    store.dispatch(setLoading(true));
    const response = await axiosInstance({
      method,
      url,
      data,
      ...options,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.errorMessage || error.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
  finally {
    store.dispatch(setLoading(false));
  }
};

export const http = {
  get: <T>(url: string, options?: any) => request<T>("get", url, null, options),
  post: <T>(url: string, data?: any, options?: any) => request<T>("post", url, data, options),
  put: <T>(url: string, data?: any, options?: any) => request<T>("put", url, data, options),
  delete: <T>(url: string, options?: any) => request<T>("delete", url, null, options),
};