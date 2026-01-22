import express from 'express';

import userController from '../controllers/userController';
import verifyToken from '../middleware/authMiddleware';
import itineraryController from '../controllers/itineraryController';

const router = express.Router();


router.post('/contact', userController.contactMessages)
router.post("/save-itinerary", verifyToken, itineraryController.addItinerary);
router.get("/user-dashboard", verifyToken, userController.getUserItineraries);
router.get('/get-itinerary/:id', itineraryController.getItinerary)
router.delete("/delete-itinerary", verifyToken, itineraryController.deleteItinerary);
router.put("/edit-itinerary", verifyToken, itineraryController.editItinerary);
router.put("/updateProfilePic", verifyToken, userController.updateUserProfilePic);

export default router;


