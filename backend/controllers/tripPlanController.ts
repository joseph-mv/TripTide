import { Request, Response } from 'express';

interface SearchAlongQuery {
  coordinates: number[][];
  distance: string;
  activities: Record<string, 'false' | 'true'>;
}

interface GetDestinationsQuery {
  coordinates: string[];
  distance: string;
  type: any;
  activities: any;
}
import db from '../config/connection';
import collection from '../config/collection';
import { getTypeLabels, searchQuery } from '../utils/tripUtils';
import { TouristLocation } from '../types/models';
import { logger } from '../utils/logger';
const MAX_WIDTH = 200;
const MIN_WIDTH = 10;

export default {

  searchAlong: async (req: Request, res: Response) => {
    try {
      // Explicitly cast req.query properties to their expected types
      const query = req.query as unknown as SearchAlongQuery;

      const { coordinates, distance, activities } = query;

      // 1 Build type filter array
      const typeLabelArr: string[] = ["Tourist Attraction", "Tourist Destination"];
      typeLabelArr.push(...getTypeLabels(activities));

      // 2 Calculate search width
      const width = Math.max(MIN_WIDTH, Math.min(parseFloat(distance) / 20, MAX_WIDTH));

      // 3 Use a Set to store unique locations
      const touristLocations = new Map<string, TouristLocation>();

      // 4 Array to hold all the promises for the database queries
      const promises: Promise<void>[] = [];

      // 5️ Generate search queries asynchronously
      if (coordinates && Array.isArray(coordinates)) {
        const dbInstance = db.get();

        for (let i = 0; i < coordinates.length - 1; i++) {
          const queryFilter = searchQuery(
            coordinates[i],
            coordinates[i + 1],
            width,
            typeLabelArr
          );

          // Push the promise of the database query to the promises array
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
                }).catch((error: any) => {
                  logger.error('Error in searchAlong:', error);
                  throw new Error('Error in searchAlong');
                }).finally(() => {
                  logger.info('Search along query completed');
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
      res.status(200).json(Array.from(touristLocations.values()));
    } catch (error) {
      console.error("Error in searchAlong:", error);
      res.status(500).json({ error: "Network issue please try again." });
    }
  },


  getDestinations: async (req: Request, res: Response) => {
    try {
      const queryParams = req.query as unknown as GetDestinationsQuery;

      let { coordinates, distance, type, activities } = queryParams;

      const parsedCoordinates = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
      const parsedDistance = distance ? parseFloat(distance) : 5;

      // 1 Generate type labels
      let typeLabelArr: string[] = [];
      typeLabelArr.push(...getTypeLabels(activities));

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


