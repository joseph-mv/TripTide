import express from 'express';
import friendsController from '../controllers/friendsController';

var router = express.Router();



router.get('/search', friendsController.searchUsers)

export default router

