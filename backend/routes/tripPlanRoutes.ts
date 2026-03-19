import express from 'express';
import tripPlanController  from '../controllers/tripPlanController'

const router = express.Router();

router.get('/suggestions', tripPlanController.searchAlong);
router.get('/destinations', tripPlanController.getDestinations);
export default router;