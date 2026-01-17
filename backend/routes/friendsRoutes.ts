import express from 'express';
import friendsController from '../controllers/friendsController';

var router = express.Router();

/**
 * @module FriendsRoutes
 * @description Routes for managing friend-related actions.
 *
 * @route GET /api/friends/search-users - Search for users by name or email .
 *
*/

router.get('/search_users',friendsController.searchUsers)

export default router

