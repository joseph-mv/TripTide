import express from 'express';

import userController from '../controllers/userController';
import verifyToken from '../middleware/authMiddleware';
import itineraryController from '../controllers/itineraryController';
import { validate } from '../middleware/validate';
import { 
  contactMessageSchema,
  idParamSchema,
  idQuerySchema,
  saveItinerarySchema,
  updateProfilePicSchema
} from '../validators/user.schema';

const router = express.Router();


router.post('/contact', validate({ body: contactMessageSchema }), userController.contactMessages);
router.post("/save-itinerary", verifyToken, validate({ body: saveItinerarySchema }), itineraryController.addItinerary);
router.get("/user-dashboard", verifyToken, userController.getUserItineraries);
router.get("/get-ongoing-trip/:id", verifyToken, validate({ params: idParamSchema }), itineraryController.getOngoingTrip);
router.get('/get-itinerary/:id', validate({ params: idParamSchema }), itineraryController.getItinerary);
router.delete("/delete-itinerary", verifyToken, validate({ query: idQuerySchema }), itineraryController.deleteItinerary);
router.put("/edit-itinerary", verifyToken, validate({ query: idQuerySchema, body: saveItinerarySchema }), itineraryController.editItinerary);
router.put("/updateProfilePic", verifyToken, validate({ body: updateProfilePicSchema }), userController.updateUserProfilePic);

export default router;


