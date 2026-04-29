const { ObjectId } = require("mongodb");

import db from '../config/connection';
import collection from '../config/collection';
import { Request, Response } from 'express';

export default {


  contactMessages: async (req: Request, res: Response) => {
    try {
      const formData = req.body
      await db.get().collection(collection.CONTACT_MSG_Collection).insertOne(formData)
      res.status(200).json({ message: 'Your message has been received. We will contact you as soon as possible.' })
    } catch (error) {
      console.error("Error fetching user itineraries:", error);
      res.status(500).json({ error: "Internal Server error" });
    }
  },


  getUserItineraries: async (req: Request, res: Response) => {


    try {
      const userId = req.userId;

      // 1️ Validate userId
      if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
      }

      // 2️ Fetch itineraries from the database
      const itineraries = await db
        ?.get()
        .collection(collection.ITINERARY_Collection)
        .find({ userId }, { projection: { _id: 1, name: 1, "details.startDate": 1, 'details.endDate': 1 } })
        .toArray();
      // 3️ Check if itineraries exist
      if (!itineraries.length) {
        return res.status(404).json({ error: "No itineraries found." });
      }

      // 4️ Return the itineraries
      return res.status(200).json(itineraries);
    } catch (err) {
      console.error("Error fetching user itineraries:", err);
      res.status(500).json({ error: "Internal Server error" }); // Proper error handling
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
        return res.status(404).json({ error: "User not found." });
      }
      if (result.modifiedCount === 0) {
        return res
          .status(200)
          .json({ message: "No changes made to the profile picture." });
      }

      // 3 Return success response
      return res.status(200).json({
        success: true,
        message: "Profile picture updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  },



};






