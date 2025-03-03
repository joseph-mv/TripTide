db = require("../config/connection");
const collection = require("../config/collection");
const { getTypeLabels, searchQuery } = require("../utils/tripUtils");

module.exports = {
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
  searchAlong: async (req, res) => {
    try {
      const { coordinates, distance, activities } = req.query;

      // 1 Build type filter array
      const typeLabelArr = ["Tourist Attraction", "Tourist Destination"];
      getTypeLabels(activities, typeLabelArr);

      // 2 Calculate search width
      const width = Math.max(10, Math.min(parseFloat(distance) / 20, 200));

      // 3 Use a Set to store unique locations
      var touristLocations = new Map();

      // 4 Array to hold all the promises for the database queries
      const promises = [];

      // 5️ Generate search queries asynchronously
      for (let i = 0; i < coordinates.length - 1; i++) {
        const query = searchQuery(
          coordinates[i],
          coordinates[i + 1],
          width,
          typeLabelArr
        );

        // Push the promise of the database query to the promises array
        promises.push(
          db
            .get()
            .collection(collection.TOURIST_Collection)
            .find(query)
            .toArray()
            .then((response) => {
              response.forEach((element) => {
                if (!touristLocations.has(element.siteLabel)) {
                  touristLocations.set(element.siteLabel, element);
                }
              });
            })
        );
      }

      // 6 Wait for all the promises to resolve
      await Promise.all(promises);

      // 7 Send response
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
  getDestinations: async (req, res) => {
    try {
      let { coordinates, distance, type, activities } = req.query;
      coordinates = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
      distance = distance || "5";

      // 1 Generate type labels
      let typeLabelArr = [];
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
            $centerSphere: [coordinates, distance / 6378.1],
          },
        },
      };
      
      // 3 Fetch destinations from database
      const destinations = await db
        .get()
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
