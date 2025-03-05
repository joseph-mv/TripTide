var express = require('express');
const friendsController = require('../controllers/friendsController');

var router = express.Router();

/**
 * @module FriendsRoutes
 * @description Routes for managing friend-related actions.
 *
 * @route GET /api/friends/search-users - Search for users by name or email .
 *
*/

router.get('/search_users',friendsController.searchUsers)

module.exports=router