var express = require('express');
var tripPlanController=require('../controllers/tripPlanController')

var router = express.Router();
router.get('/suggestions',tripPlanController.searchAlong)

router.get('/destinations' ,tripPlanController.getDestinations)

module.exports=router