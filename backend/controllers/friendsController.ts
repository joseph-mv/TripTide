import db from '../config/connection';
import collection from '../config/collection';
import { Request, Response } from 'express';

export default {

  searchUsers: async (req: Request, res: Response) => {
    try {
      const { query } = req.query;

      // 1️ Validate the query parameter
      if (!query || (typeof query === "string" && query.trim() === "")) {
        return res.status(400).json({ error: "Query parameter is required." });
      }

      // 2️ Search for users by name or email
      const users = await db
        .get()
        .collection(collection.User_Collection)
        .find({
          $or: [
            { name: { $regex: query, $options: "i" } }, // Case-insensitive name search
            { email: { $regex: query, $options: "i" } }, // Case-insensitive email search
          ],
        })
        .limit(10)
        .toArray();

      // 3️ Return results or "No users found" response
      if (!users.length) {
        return { status: 404, data: { message: "No users found" } }; // Return 404 if no users found
      }

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};


