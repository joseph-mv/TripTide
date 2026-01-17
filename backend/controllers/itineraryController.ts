import db from '../config/connection';
// import promise from 'promise';

import collection from '../config/collection';
const { ObjectId } = require("mongodb");
import { Request, Response } from 'express';

export default {
  /**
   * @function addItinerary
   * @description Adds a new itinerary to the database.
   * @param {Object} req - Express request object.
   * @param {Object} req.body - Itinerary data from the client.
   * @param {Object} res - Express response object.
   * @returns {Object} JSON response indicating success or failure.
   */
  addItinerary: async (req: Request, res: Response) => {
    try {
      const itineraryData = req.body;

      // 1 Insert data into the database
      const result = await db
        .get()
        .collection(collection.ITINERARY_Collection)
        .insertOne(itineraryData);

      // 2 Return success response
      return res.status(201).json({ success: true, data: result });

    } catch (error) {
      console.error("Error adding itinerary:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getItinerary: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Query MongoDB using Native Driver
      const itinerary = await db
        .get()
        .collection(collection.ITINERARY_Collection)
        .findOne({ _id: new ObjectId(id) });

      // If itinerary not found, return 404
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.status(200).json(itinerary);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   * @function deleteItinerary
   * @description Deletes an itinerary from the database.
   * @param {Object} req - Express request object.
   * @param {string} req.query.id - ID of the itinerary to delete.
   * @param {Object} res - Express response object.
   * @returns {Object} JSON response indicating success or failure.
   */
  deleteItinerary: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      // 1 Delete the itinerary
      const result = await db
        .get()
        .collection(collection.ITINERARY_Collection)
        .deleteOne({ _id: new ObjectId(id) });

      // 2 Return success response
      return res.status(200).json({ success: true, message: "Itinerary deleted successfully." });

    } catch (error) {
      console.error("Error deleting itinerary:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },


  /**
   * @function editItinerary
   * @description Updates an itinerary in the database.
   * @param {Object} req - Express request object.
   * @param {string} req.query.id - ID of the itinerary to edit.
   * @param {Object} req.body - Updated itinerary data.
   * @param {Object} res - Express response object.
   * @returns {Object} JSON response indicating success or failure.
   */
  editItinerary: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const itinerary = req.body;
      console.log(itinerary)
      // 1 Update the itinerary
      const result = await db
        .get()
        .collection(collection.ITINERARY_Collection)
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: itinerary },
          { upsert: false } // Prevents insert if document is not found
        );

      // 2 Return success response
      return res.status(200).json({ success: true, message: "Itinerary updated successfully." });

    } catch (error) {
      console.error("Error updating itinerary:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

};


