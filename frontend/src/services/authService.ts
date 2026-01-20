import { axiosInstance } from "./api";
import { AuthResponse } from "../types";

const NETWORK_ISSUE_MSG = "Network issue. Please try again later."


export const loginUser = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', { email, password });
    if (response.data.status) return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG);
  }
}

export const signupUser = async (name: string, email: string, password: string): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.post<{ msg: string, status?: boolean }>('/auth/sign-up', { name, email, password });
    if (response.data) return response.data.msg;
  } catch (error: any) {
    throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG);
  }
}

export const forgotPassword = async (email: string): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.post<{ msg: string }>('/auth/forgot-password', { email });
    if (response.data) return response.data.msg;
  } catch (error: any) {
    throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG);
  }
}

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.post<{ msg: string }>('/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    if (response.data) return response.data.msg;
  } catch (error: any) {
    throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG);
  }
}

export const verifyEmail = async (token: string): Promise<{ msg: string, success: boolean }> => {
  try {
    const response = await axiosInstance.get<{ msg: string }>(`/auth/verify-email?token=${token}`);
    return { msg: response.data.msg, success: true };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.error ?? NETWORK_ISSUE_MSG);
  }
}
