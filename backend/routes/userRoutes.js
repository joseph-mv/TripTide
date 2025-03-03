const express = require("express");
const router = express.Router();

const userHelper = require("../controllers/user-helper");
const itineraryController = require("../controllers/itineraryController");
const verifyToken = require("../middleware/authMiddleware");


router.post("/save-itinerary", verifyToken, itineraryController.addItinerary);

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

router.delete("/delete-itinerary", verifyToken, itineraryController.deleteItinerary);

router.post("/edit-itinerary", verifyToken, itineraryController.editItinerary);

router.post("/updateProfilePic", verifyToken, (req, res) => {
  userHelper
    .updateUserProfilePic({ ...req.body, userId: req.userId })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
