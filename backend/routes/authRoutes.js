const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userHelper = require("../controllers/user-helper");
const authController=require('../controllers/authController')
const { generateAccessToken } = require("../config/jwt");

router.post("/sign-up", authController.signUp);

router.get("/verify-email", authController.verifyEmail);

router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password",authController.resetPassword);

router.post("/refresh-token", authController.refreshToken);

module.exports=router