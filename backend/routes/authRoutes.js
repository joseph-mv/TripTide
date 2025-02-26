const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userHelper = require("../controllers/user-helper");
const authController=require('../controllers/authContoller')
const { generateAccessToken, generateRefreshToken } = require("../config/jwt");

router.post("/sign-up", authController.signUp);

router.get("/verify-email", (req, res) => {
  authController.verifyEmail(req.query.token)
    .then((response) => {     
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/reset-password", (req, res) => {
  userHelper
    .resetPassword(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/login", (req, res) => {
  userHelper
    .login(req.body)
    .then((response) => {
      if (response.status) {
        const token = generateAccessToken({ userId: response.userId });
        const refreshToken = generateRefreshToken({ userId: response.userId });

        res.status(200).json({
          token,
          refreshToken,
          ...response,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(201)
        .json({ status: false, loggedError: "Invalid Email or Password" });
    });
});

router.post("/forgot-password", (req, res) => {
  userHelper
    .forgotPassword(req.body)
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/refresh-token", (req, res) => {
  const { refreshToken, userId } = req.body;
  if (!refreshToken)
    return res.status(403).send({ message: "No refresh token provided" });
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(401).send({ message: "Invalid refresh token" });
    const newAccessToken = generateAccessToken({ username: userId });
    res.send({ token: newAccessToken });
  });
});


module.exports=router