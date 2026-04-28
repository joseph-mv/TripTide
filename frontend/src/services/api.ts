import axios, { AxiosRequestConfig } from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export type Response = {
  success: boolean;
  message: string;
  error: string;
  data: any;
  meta: Record<string, any>;
}
 
// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set your backend API URL
  timeout: 10000, // Optional: timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    const res: Response = response.data;
    if (res.success === false) {
      return Promise.reject(new Error(res.message || res.error || 'Unknown error'));
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error.response?.data?.message ?? 'Unknown error');
  }
);

import { AxiosInstance} from "axios";

type CustomAxiosInstance = Omit<AxiosInstance, "get" | "post" | "put" | "delete"> & {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
};

export const api = axiosInstance as CustomAxiosInstance;