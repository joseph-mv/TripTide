import { api } from "./api";
import { NETWORK_ISSUE_MSG } from "../constants/api";
import { AuthResponse } from "../types";


export const loginUser = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const signupUser = async (name: string, email: string, password: string): Promise<string | undefined> => {
  try {
    const response = await api.post('/auth/sign-up', { name, email, password });
    return response.message;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const forgotPassword = async (email: string): Promise<string | undefined> => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.message;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<string | undefined> => {
  try {
    const response = await api.post('/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    return response.data.msg;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const verifyEmail = async (token: string | null): Promise<{ msg: string, success: boolean }> => {
  if (!token) return { msg: "Invalid token", success: false };
  try {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return { msg: response.message, success: true };
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}
