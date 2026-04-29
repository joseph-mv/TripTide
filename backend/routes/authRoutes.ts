import express from 'express';
import authController from '../controllers/authController'

const router = express.Router();



router.post("/sign-up", authController.signUp);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/refresh-token", authController.refreshToken);

export default router

