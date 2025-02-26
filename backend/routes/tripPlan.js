var express = require('express');
var router = express.Router();
var tripPlanHelper=require('../controllers/tripPlan-helper')

router.get('/suggetions',(req,res)=>{
   // console.log('suggetions',req.query)
   tripPlanHelper.searchAlong(req.query.coordinates,req.query.distance,req.query.activities
   ).then((response)=>{
      // console.log(response)
      res.json(response)
   })
})
router.get('/destinations' ,(req,res)=>{
   console.log('destinations')
   tripPlanHelper.getDestinations(req.query
   ).then((response)=>{
      // console.log(response)
      res.json(response)
   })
})

module.exports=router