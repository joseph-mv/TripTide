import express from 'express';
import tripPlanController  from '../controllers/tripPlanController'
import { validate } from "../middleware/validate";
import {
  getDestinationsBodySchema,
  searchAlongBodySchema,
} from "../validators/trip.schema";

const router = express.Router();

router.post("/suggestions", validate({ body: searchAlongBodySchema }), tripPlanController.searchAlong);
router.post("/destinations", validate({ body: getDestinationsBodySchema }), tripPlanController.getDestinations);
export default router; 