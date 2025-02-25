const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userHelper = require("../Helpers/user-helper");
const itineraryHelper = require("../Helpers/itinerary-helper");
const verifyToken = require("../middleware/authMiddleware");
const { generateAccessToken, generateRefreshToken } = require("../config/jwt");



router.post("/sign-up", (req, res) => {
  userHelper
    .signUp(req.body)
    .then((response) => res.json(response))
    .catch((error) => {
      console.error("Sign-up error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get("/verify-email", (req, res) => {
  userHelper
    .verifyEmail(req.query.token)
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

router.post("/save-itinerary", verifyToken, (req, res) => {
  itineraryHelper
    .addItinerary(req.body)
    .then((response) => {
      // console.log(response)
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" }); // Handle errors appropriately
    });
});

router.get("/user-dashboard", verifyToken, (req, res) => {
  console.log(req.userId);
  userHelper
    .getUserItineraries(req.userId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/delete-trip", verifyToken, (req, res) => {
  console.log(req.query);
  itineraryHelper
    .deleteItinerary(req.query.id)
    .then((response) => {
      res.status(200).json(true);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/edit-itinerary", verifyToken, (req, res) => {
  const { id } = req.query;
  itineraryHelper
    .editItinerary(req.body, id)
    .then((response) => {
      res.status(200).json(true);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/updateProfilePic", verifyToken, (req, res) => {
  userHelper
    .updateUserProfilePic({ ...req.body, userId: req.userId })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
