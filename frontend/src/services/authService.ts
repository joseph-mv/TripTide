import { api } from "./api";
import { NETWORK_ISSUE_MSG } from "../constants/api";
import { AuthResponse } from "../types";


export const loginUser = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const signupUser = async (name: string, email: string, password: string): Promise<string | undefined> => {
  try {
    const response = await api.post('/api/auth/sign-up', { name, email, password });
    return response.message;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const forgotPassword = async (email: string): Promise<string | undefined> => {
  try {
    const response = await api.post('/api/auth/forgot-password', { email });
    return response.message;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<string | undefined> => {
  try {
    const response = await api.post('/api/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    return response.message;
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
}

export const verifyEmail = async (token: string | null): Promise<{ msg: string, success: boolean }> => {
  if (!token) return { msg: "Invalid token", success: false };
  try {
    const response = await api.get(`/api/auth/verify-email?token=${token}`);
    return { msg: response.message, success: true };
  } catch (error: any) {
    throw new Error(error ?? NETWORK_ISSUE_MSG);
  }
};

// Function to refresh access token
export const refreshToken = async () => {

  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await api.post('/api/auth/refresh-token', { refreshToken });
    const newAccessToken = response.data.token;
    
    // Update the access token in storage
    localStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log('error',error)
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return null;
  }
};
