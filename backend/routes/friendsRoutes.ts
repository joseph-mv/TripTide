import express from 'express';
import friendsController from '../controllers/friendsController';

var router = express.Router();



router.get('/search_users', friendsController.searchUsers)

export default router

