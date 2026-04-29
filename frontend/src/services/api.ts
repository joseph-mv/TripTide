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
  // timeout: 10000, // Optional: timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    const res= response.data;
    if (res.success === false) {
      return Promise.reject(new Error(res.message || res.error || 'Unknown error'));
    }
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      // logout user or refresh token
    }
    return Promise.reject(error.response?.data?.message ?? 'Unknown error');
  }
);

import { AxiosInstance} from "axios";

type CustomAxiosInstance = Omit<AxiosInstance, "get" | "post" | "put" | "delete"> & {
  get(url: string, config?: AxiosRequestConfig): Promise<Response>;
  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<Response>;
  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<Response>;
  delete(url: string, config?: AxiosRequestConfig): Promise<Response>;
};

export const api = axiosInstance as CustomAxiosInstance;
