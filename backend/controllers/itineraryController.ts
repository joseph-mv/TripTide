import db from '../config/connection';
// import promise from 'promise';

import collection from '../config/collection';
const { ObjectId } = require("mongodb");
import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/apiResponse';

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
      return successResponse(res, result, "Itinerary added successfully", {}, 201);

    } catch (error) {
      console.error("Error adding itinerary:", error);
      return errorResponse(res, "Internal Server Error", 500, error);
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
        return errorResponse(res, "Itinerary not found", 404);
      }
      return successResponse(res, itinerary);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      return errorResponse(res, "Internal Server Error", 500, error);
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
        return errorResponse(res, "Itinerary not found", 404);
      }
      return successResponse(res, ongoingTrip);
    } catch (error) {
      console.error("Error fetching ongoing trip:", error);
      return errorResponse(res, "Internal Server Error", 500, error);
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
      return successResponse(res, null, "Itinerary deleted successfully.");

    } catch (error) {
      console.error("Error deleting itinerary:", error);
      return errorResponse(res, "Internal Server Error", 500, error);
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
      return successResponse(res, null, "Itinerary updated successfully.");

    } catch (error) {
      console.error("Error updating itinerary:", error);
      return errorResponse(res, "Internal Server Error", 500, error);
    }
  },

};


