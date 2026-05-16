import express from 'express';

import userController from '../controllers/userController';
import verifyToken from '../middleware/authMiddleware';
import itineraryController from '../controllers/itineraryController';
import { validate } from '../middleware/validate';
import { 
  contactMessageSchema,
  idParamSchema,
  idQuerySchema,
  ItinerarySchema,
  updateProfilePicSchema
} from '../validators/user.schema';

const router = express.Router();


router.post('/contact-messages', validate({ body: contactMessageSchema }), userController.contactMessages);
router.post("/itineraries", verifyToken, validate({ body: ItinerarySchema(false) }), itineraryController.addItinerary);
router.get("/dashboard", verifyToken, userController.getUserItineraries);
router.get("/itineraries/ongoing/:id", verifyToken, validate({ params: idParamSchema }), itineraryController.getOngoingTrip);
router.get('/itineraries/:id', validate({ params: idParamSchema }), itineraryController.getItinerary);
router.delete("/itineraries/:id", verifyToken, validate({ params: idParamSchema }), itineraryController.deleteItinerary);
router.put("/itineraries/:id", verifyToken, validate({ params: idParamSchema, body: ItinerarySchema(true) }), itineraryController.editItinerary);
router.put("/profile-picture", verifyToken, validate({ body: updateProfilePicSchema }), userController.updateUserProfilePic);

export default router;