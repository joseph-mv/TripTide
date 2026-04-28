import { NETWORK_ISSUE_MSG } from "../constants/api";
import { AuthResponse } from "../types";
import { api } from "./api";



export const loginUser = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const signupUser = async (name: string, email: string, password: string): Promise<string | undefined> => {
  try {
    const response = await api.post<{ msg: string }>('/auth/sign-up', { name, email, password });
    return response.msg;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const forgotPassword = async (email: string): Promise<string | undefined> => {
  try {
    const response = await api.post<{ msg: string }>('/auth/forgot-password', { email });
    return response.msg;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<string | undefined> => {
  try {
    const response = await api.post<{ msg: string }>('/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    return response.msg;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const verifyEmail = async (token: string | null): Promise<{ msg: string, success: boolean }> => {
  if (!token) return { msg: "Invalid token", success: false };
  try {
    const response = await api.get<{ msg: string }>(`/auth/verify-email?token=${token}`);
    return { msg: response.msg, success: true };
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}
