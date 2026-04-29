import express from 'express';
import authController from '../controllers/authController'
import { validate } from "../middleware/validate";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  resetPasswordSchema,
  signUpSchema,
  verifyEmailQuerySchema,
} from "../validators/auth.schema";

const router = express.Router();

router.post("/sign-up", validate({ body: signUpSchema }), authController.signUp);
router.get("/verify-email", validate({ query: verifyEmailQuerySchema }), authController.verifyEmail);
router.post("/login", validate({ body: loginSchema }), authController.login);
router.post("/forgot-password", validate({ body: forgotPasswordSchema }), authController.forgotPassword);
router.post("/reset-password", validate({ body: resetPasswordSchema }), authController.resetPassword);
router.post("/refresh-token", validate({ body: refreshTokenSchema }), authController.refreshToken);

export default router

