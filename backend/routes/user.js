const express = require("express");
const router = express.Router();

const userHelper = require("../Helpers/user-helper");
const itineraryHelper = require("../Helpers/itinerary-helper");
const verifyToken = require("../middleware/authMiddleware");


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
