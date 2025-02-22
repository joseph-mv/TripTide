var express = require('express');
const friendsHelper = require('../Helpers/friends-helper');

var router = express.Router();

router.get('/search_users',async(req,res)=>{
        const result=await friendsHelper.searchUsers(req.query)
        res.status(result.status).json(result.data);
})



module.exports=router