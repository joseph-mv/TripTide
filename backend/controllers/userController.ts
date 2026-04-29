const { ObjectId } = require("mongodb");

import db from '../config/connection';
import collection from '../config/collection';
import { Request, Response } from 'express';
import { ContactMessage } from '../validators/user.schema';
import { successResponse, errorResponse } from '../utils/apiResponse';

export default {


  contactMessages: async (req: Request, res: Response) => {
    try {
      const formData = req.validatedBody as ContactMessage
      await db.get().collection(collection.CONTACT_MSG_Collection).insertOne(formData)
      return successResponse(res, null, 'Your message has been received. We will contact you as soon as possible.')
    } catch (error) {
      return errorResponse(res, "Internal Server error", 500, error);
    }
  },


  getUserItineraries: async (req: Request, res: Response) => {


    try {
      const userId = req.userId;

      // 1️ Validate userId
      if (!userId) {
        return errorResponse(res, "User ID is required.", 400);
      }

      // 2️ Fetch itineraries from the database
      const itineraries = await db
        ?.get()
        .collection(collection.ITINERARY_Collection)
        .find({ userId }, { projection: { _id: 1, name: 1, "details.startDate": 1, 'details.endDate': 1 } })
        .toArray();
      // 3️ Check if itineraries exist
      if (!itineraries.length) {
        return errorResponse(res, "No itineraries found.", 404);
      }

      // 4️ Return the itineraries
      return successResponse(res, itineraries, "Itineraries retrieved successfully");
    } catch (err) {
      console.error("Error fetching user itineraries:", err);
      return errorResponse(res, "Internal Server error", 500, err); // Proper error handling
    }
  },


  updateUserProfilePic: async (req: Request, res: Response) => {
    try {
      const { imageData } = req.body;
      const userId = req.userId;

      // 1 Update the user's profile picture
      const result = await db
        .get()
        .collection(collection.User_Collection)
        .updateOne(
          { _id: new ObjectId(userId) },
          { $set: { image: imageData } }
        );

      // 2 Check if the profile picture was updated
      if (result.matchedCount === 0) {
        return errorResponse(res, "User not found.", 404);
      }
      if (result.modifiedCount === 0) {
        return successResponse(res, null, "No changes made to the profile picture.");
      }

      // 3 Return success response
      return successResponse(res, null, "Profile picture updated successfully.");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      return errorResponse(res, "Internal Server Error.", 500, error);
    }
  },



};






