import express from 'express';
import tripPlanController  from '../controllers/tripPlanController'
import { validate } from "../middleware/validate";
import {
  getDestinationsQuerySchema,
  searchAlongQuerySchema,
} from "../validators/trip.schema";

const router = express.Router();

router.post("/suggestions", validate({ body: searchAlongQuerySchema }), tripPlanController.searchAlong);
router.post("/destinations", validate({ body: getDestinationsQuerySchema }), tripPlanController.getDestinations);
export default router; 