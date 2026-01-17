import express from 'express';
import tripPlanController from '../controllers/tripPlanController'

var router = express.Router();
router.get('/suggestions',tripPlanController.searchAlong)

router.get('/destinations' ,tripPlanController.getDestinations)

export default router

