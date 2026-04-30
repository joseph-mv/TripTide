import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import db from '../config/connection';
import collection from '../config/collection';
import { generateRefreshToken, generateAccessToken } from '../config/jwt';
import {
  sendVerificationEmail,
  checkExistingUser,
  hashPassword,
  sendOtp,
} from '../utils/authUtils';
import { successResponse, errorResponse } from '../utils/apiResponse';
import {
  ForgotPasswordBody,
  LoginBody,
  RefreshTokenBody,
  ResetPasswordBody,
  SignUpBody,
  VerifyEmailQuery,
} from "../validators/auth.schema";
import { env } from "../config/env";

interface DecodedToken extends jwt.JwtPayload {
  userId?: string;
}

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default {

  signUp: async (req: Request, res: Response) => {
    const { name, email, password } = req.validatedBody as SignUpBody;
    try {
      // 1️ Check if the email is already registered
      if (await checkExistingUser(email)) {
        return errorResponse(res, "Oops, the email is already used. Try another", 400);
      }

      // 2️ Hash the password securely before storing in DB
      const hashedPassword = await hashPassword(password);

      // 3️ Generate a unique email verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // 4️ Create a new user object for insertion
      const newUser = {
        name,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false,
        createdAt: new Date(),
      };

      // 5️ Insert user into the database
      const dbInstance = db.get();
      if (!dbInstance) {
        throw new Error("Database not initialized");
      }

      const result = await dbInstance
        .collection(collection.User_Collection)
        .insertOne(newUser);

      if (!result.insertedId)
        return errorResponse(res, "Failed to register user!", 500);

      // 6️ Send verification email with a unique token
      await sendVerificationEmail(
        name,
        email,
        verificationToken
      );

      // 7️ Return success response
      return successResponse(res, null, "Signup successful. A verification email has been sent to " + email + ".", {}, 201);
    } catch (error: unknown) {
      const message = getErrorMessage(error, "Signup failed!");
      return errorResponse(res, message, 500, error);
    }
  },


  verifyEmail: async (req: Request, res: Response) => {
    try {
      const { token } = req.validatedQuery as VerifyEmailQuery;

      const dbInstance = db.get();
      if (!dbInstance) throw new Error("Database not initialized");

      const user = await dbInstance
        .collection(collection.User_Collection)
        .findOneAndUpdate(
          { verificationToken: token },
          { $set: { isVerified: true } },
          { returnDocument: "after" } // Returns updated document
        );

      // 2 If no user is found , return an error
      if (!user?.isVerified) {
        return errorResponse(res, "Invalid or expired token", 400);
      }

      // 3 Send a success response
      return successResponse(res, null, "Email verified successfully");
    } catch (error) {
      console.error("Email Verification Error:", error);
      return errorResponse(res, "Internal Server Error", 500, error);
    }
  },


  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.validatedBody as LoginBody;

      // 2 Check if user exists and is verified
      const existingUser = await checkExistingUser(email);

      if (!existingUser?.isVerified) {
        return errorResponse(res, "Invalid email or password", 400);
      }

      // 3 Compare hashed password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordValid) {
        return errorResponse(res, "Invalid email or password", 400);
      }

      // 4 Generate tokens
      const token = generateAccessToken({ userId: existingUser._id.toString() });
      const refreshToken = generateRefreshToken({ userId: existingUser._id.toString() });

      // 5 Send response
      return successResponse(res, {
        userName: existingUser.name,
        userId: existingUser._id,
        image: existingUser.image || null, // Ensuring null if no image is found
        email: existingUser.email,
        token,
        refreshToken,
      }, "Login successful");
    } catch (error) {
      console.error("Login Error:", error);

      return errorResponse(res, "Something went wrong. Please try again later.", 500, error);
    }
  },

  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.validatedBody as ForgotPasswordBody;

      // 1 Check if user exists
      const user = await checkExistingUser(email);
      if (!user) {
        return errorResponse(res, "No user found with this email", 404);
      }

      // 2 Generate a 4-digit OTP and set expiration time (1 hour)
      const otp = crypto.randomInt(1000, 9999).toString();
      const expirationTime = Date.now() + 3600000;

      // 3 Store OTP and expiration time in the database
      const dbInstance = db.get();
      if (!dbInstance) throw new Error("Database not initialized");

      await dbInstance
        .collection(collection.User_Collection)
        .updateOne(
          { email },
          {
            $set: {
              resetPasswordOtp: otp,
              resetPasswordExpires: expirationTime,
            },
          }
        );

      // 4 Send OTP via email
      const otpRes = await sendOtp(email, otp);

      // 5 Respond with success
      return successResponse(res, null, "OTP sent successfully. An OTP has been sent to " + email + ".");
    } catch (error: unknown) {
      const message = getErrorMessage(error, "Something went wrong. Please try again ");
      console.log(error);
      return errorResponse(res, message, 500, error);
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const { email, otp, newPassword } = req.validatedBody as ResetPasswordBody;

      const dbInstance = db.get();
      if (!dbInstance) throw new Error("Database not initialized");

      // 1 Find user with valid OTP and check if it's not expired
      const user = await dbInstance
        .collection(collection.User_Collection)
        .findOne({
          email,
          resetPasswordOtp: otp,
          resetPasswordExpires: { $gt: Date.now() }, // Check if OTP is still valid
        });

      if (!user) {
        return errorResponse(res, "Invalid OTP or OTP has expired", 400);
      }

      // 2 Hash the new password
      const hashedPassword = await hashPassword(newPassword);

      // 3 Update user password and reset OTP fields
      await dbInstance
        .collection(collection.User_Collection)
        .updateOne(
          { email },
          {
            $set: {
              password: hashedPassword,
            },
            $unset: { resetPasswordOtp: "", resetPasswordExpires: "" },
          }
        );

      // 4 Return success response
      return successResponse(res, null, "Password has been reset successfully.");
    } catch (error) {
      console.log(error);
      return errorResponse(res, "Something went wrong. Please try again later.", 500, error);
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.validatedBody as RefreshTokenBody;

      // 2️ Verify the refresh token
      const secret = env.JWT_REFRESH_SECRET;

      const decoded = jwt.verify(refreshToken, secret) as DecodedToken;

      if (!decoded || !decoded.userId) {
        return errorResponse(res, "Invalid refresh token.", 401);
      }

      // 3 Generate a new access token
      const newAccessToken = generateAccessToken({ userId: decoded.userId });

      // 4️ Send the new token
      return successResponse(res, { token: newAccessToken }, "Token refreshed successfully");
    } catch (error) {
      console.error("Refresh token error:", error);
      return errorResponse(res, "Something went wrong. Please try again later.", 500, error);
    }
  },
};


