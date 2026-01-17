import express from 'express';
import authController from '../controllers/authController'

const router = express.Router();

/**
 * @module AuthRoutes
 * @description Routes for user authentication & account management.
 *
 * @route POST /api/auth/sign-up - Register a new user.
 * @route GET /api/auth/verify-email - Verify user email using a token.
 * @route POST /api/auth/login - Authenticate user & return an access token.
 * @route POST /api/auth/forgot-password - Send OTP for password reset.
 * @route POST /api/auth/reset-password - Reset password using OTP.
 * @route POST /api/auth/refresh-token - Generate a new access token using refresh token.
 *
 */

router.post("/sign-up", authController.signUp);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password",authController.resetPassword);
router.post("/refresh-token", authController.refreshToken);

export default router

