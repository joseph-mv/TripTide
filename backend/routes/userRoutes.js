const express = require("express");

const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");
const itineraryController = require("../controllers/itineraryController");

const router = express.Router();

/**
 * @module UserRoutes
 * @description Routes for user itinerary management and profile updates.
 *
 * @route   POST  /api/user/save-itinerary       - Save a new itinerary.
 * @route   GET   /api/user/user-itineraries     - Get all itineraries for the logged-in user.
 * @route   DELETE /api/user/delete-itinerary    - Delete an itinerary by ID.
 * @route   PUT   /api/user/edit-itinerary       - Edit an existing itinerary.
 * @route   PUT   /api/user/update-profile-pic   - Update the user's profile picture.
 *
 * @middleware verifyToken - Ensures authentication for all user-related routes.
 */
router.post('/contact',userController.contactMessages)
router.post("/save-itinerary", verifyToken, itineraryController.addItinerary);
router.get("/user-dashboard", verifyToken, userController.getUserItineraries);
router.get('/get-itinerary/:id',itineraryController.getItinerary)
router.delete("/delete-itinerary", verifyToken, itineraryController.deleteItinerary);
router.put("/edit-itinerary", verifyToken, itineraryController.editItinerary);
router.put("/updateProfilePic", verifyToken,userController.updateUserProfilePic);

module.exports = router;
