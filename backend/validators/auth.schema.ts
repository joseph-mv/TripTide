import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const verifyEmailQuerySchema = z.object({
  token: z.string().trim().min(1, "Verification token is required"),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().trim().length(4, "OTP must be 4 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, "Refresh token is required"),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
export type VerifyEmailQuery = z.infer<typeof verifyEmailQuerySchema>;
export type LoginBody = z.infer<typeof loginSchema>;
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenBody = z.infer<typeof refreshTokenSchema>;
