import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
 
// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set your backend API URL
  timeout: 10000, // Optional: timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});