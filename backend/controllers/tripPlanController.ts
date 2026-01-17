import { Request, Response } from 'express';
import db from '../config/connection';
import collection from '../config/collection';
import { getTypeLabels, searchQuery } from '../utils/tripUtils';
import { TouristLocation } from '../types/models';

export default {
  /**
   * @function searchAlong
   * @description Fetches tourist locations along a route within a given distance.
   * @param {Object} req - Express request object.
   * @param {Object} req.query - Query parameters.
   * @param {Array} req.query.coordinates - List of [longitude, latitude] points forming the route.
   * @param {string|number} req.query.distance - Search distance along the route.
   * @param {Object} req.query.activities - User-selected activity filters.
   * @param {Object} res - Express response object.
   * @returns {Object} JSON response with a list of tourist locations.
   */
  searchAlong: async (req: Request, res: Response) => {
    try {
      // Explicitly cast req.query properties to their expected types
      const query = req.query as unknown as {
        coordinates: number[][]; // Assumes body parser handles this or needs manual parsing if pure query string
        distance: string;
        activities: any;
      };

      const { coordinates, distance, activities } = query;

      // 1 Build type filter array
      const typeLabelArr: string[] = ["Tourist Attraction", "Tourist Destination"];
      getTypeLabels(activities, typeLabelArr);

      // 2 Calculate search width
      const width = Math.max(10, Math.min(parseFloat(distance) / 20, 200));

      // 3 Use a Set to store unique locations
      var touristLocations = new Map<string, TouristLocation>();

      // 4 Array to hold all the promises for the database queries
      const promises: Promise<void>[] = [];

      // 5️ Generate search queries asynchronously
      if (coordinates && Array.isArray(coordinates)) {
        for (let i = 0; i < coordinates.length - 1; i++) {
          const queryFilter = searchQuery(
            coordinates[i],
            coordinates[i + 1],
            width,
            typeLabelArr
          );

          // Push the promise of the database query to the promises array
          const dbInstance = db.get();
          if (dbInstance) {
            promises.push(
              dbInstance
                .collection(collection.TOURIST_Collection)
                .find(queryFilter)
                .toArray()
                .then((response: any[]) => { // Using any[] for raw mongo response, ideally stricttyped
                  response.forEach((element: TouristLocation) => {
                    if (element.siteLabel && !touristLocations.has(element.siteLabel)) {
                      touristLocations.set(element.siteLabel, element);
                    }
                  });
                })
            );
          }
        }
      }


      // 6 Wait for all the promises to resolve
      await Promise.all(promises);

      // 7 Send response
      if (!touristLocations.size) {
        return res.status(404).json({ error: "Oops! We couldn't find any destinations that match your chosen activities. Please try selecting different activities or refining your search" });
      }
      res.status(201).json(Array.from(touristLocations.values()));
    } catch (error) {
      console.error("Error in searchAlong:", error);
      res.status(500).json({ error: "Network issue please try again." });
    }
  },

  /**
   * @function getDestinations
   * @description Fetches destinations based on user-selected location, distance, and types.
   * @param {Object} req - Express request object.
   * @param {Object} req.query - Query parameters.
   * @param {Array} req.query.coordinates - User's selected [longitude, latitude].
   * @param {string} req.query.distance - Search radius (in km).
   * @param {Object} req.query.type - Selected types (e.g., beaches, mountains).
   * @param {Object} req.query.activities - Selected activities (e.g., shopping,adventure).
   * @param {Object} res - Express response object.
   * @returns {Object} JSON response with a list of destinations.
   */
  getDestinations: async (req: Request, res: Response) => {
    try {
      const queryParams = req.query as unknown as {
        coordinates: string[];
        distance: string;
        type: any;
        activities: any;
      };

      let { coordinates, distance, type, activities } = queryParams;

      const parsedCoordinates = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
      const parsedDistance = distance ? parseFloat(distance) : 5;

      // 1 Generate type labels
      let typeLabelArr: string[] = [];
      getTypeLabels(activities, typeLabelArr);

      for (let key in type) {
        if (type[key] === "true") {
          typeLabelArr.push(key);
        }
      }
      typeLabelArr = [...new Set(typeLabelArr)]; // Remove duplicates

      // 2 Construct database query
      const query = {
        typeLabel: { $in: typeLabelArr },
        "location.coordinates": {
          $geoWithin: {
            $centerSphere: [parsedCoordinates, parsedDistance / 6378.1],
          },
        },
      };

      // 3 Fetch destinations from database
      const dbInstance = db.get();
      if (!dbInstance) {
        throw new Error("Database not initialized");
      }

      const destinations = await dbInstance
        .collection(collection.TOURIST_Collection)
        .find(query)
        .toArray();

      // 4 Return results
      return res.status(200).json(destinations);
    } catch (error) {
      console.error("Error in getDestinations:", error);
      return res
        .status(500)
        .json({ error: "Internal server error. Please try again later." });
    }
  },
};


