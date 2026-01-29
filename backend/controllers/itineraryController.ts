import db from '../config/connection';
// import promise from 'promise';

import collection from '../config/collection';
const { ObjectId } = require("mongodb");
import { Request, Response } from 'express';

export default {

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

  getOngoingTrip: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const ongoingTrip = await db
        .get()
        .collection(collection.ITINERARY_Collection)
        .findOne(
          { _id: new ObjectId(id) },
          {
            projection: {
              _id: 1,
              name: 1,
              noOfDays: 1,
              distance: 1,
              travelTime: 1,
              details: 1,
            },
          }
        );

      if (!ongoingTrip) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.status(200).json(ongoingTrip);
    } catch (error) {
      console.error("Error fetching ongoing trip:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

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


