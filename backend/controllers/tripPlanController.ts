import { Request, Response } from 'express';

import db from '../config/connection';
import collection from '../config/collection';
import { getTypeLabels, searchQuery } from '../utils/tripUtils';
import { TouristLocation } from '../types/models';
import { logger } from '../utils/logger';
import { GetDestinationsQuery, SearchAlongQuery } from "../validators/trip.schema";
const MAX_WIDTH = 200;
const MIN_WIDTH = 10;

export default {

  searchAlong: async (req: Request, res: Response) => {
    try {
      const { coordinates, distance, activities } = req.validatedQuery as SearchAlongQuery;
      console.log('coordinates', coordinates, 'distance', distance, 'activities', activities);

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
                .then((response) => {
                  response.forEach((element) => {
                    const location = element as unknown as TouristLocation;
                    if (location.siteLabel && !touristLocations.has(location.siteLabel)) {
                      touristLocations.set(location.siteLabel, location);
                    }
                  });
                }).catch((error: unknown) => {
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
      const { coordinates, distance, type, activities } = req.validatedQuery as GetDestinationsQuery;

      const parsedCoordinates: [number, number] = [coordinates[0], coordinates[1]];
      const parsedDistance = distance ? parseFloat(distance) : 5;

      // 1 Generate type labels
      let typeLabelArr: string[] = [];
      typeLabelArr.push(...getTypeLabels(activities));

      for (const key in type) {
        if (type[key]) {
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


