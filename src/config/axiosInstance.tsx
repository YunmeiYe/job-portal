import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { clearAuthLocalStorage, getItem } from "../utils/localStorage";
import store from "../store/store";
import { removeUser } from "../store/authSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(removeUser());
      clearAuthLocalStorage();
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;

