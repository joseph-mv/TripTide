
const { ObjectId } = require("mongodb");

const db = require("../config/connection");
const collection = require("../config/collection");

module.exports = {

  getUserItineraries: async (userId) => {
    try {
      const itineraries = await db
        .get()
        .collection(collection.ITINERARY_Collection)
        .find({ userId })
        .toArray();

      if (itineraries.length > 0) {
        // console.log(itineraries);
        return itineraries; // No need to manually resolve, async functions return Promises
      } else {
        throw { error: "No itineraries found" }; // Throwing an error, which will be caught
      }
    } catch (err) {
      throw { error: "Database error", details: err }; // Proper error handling
    }
  },
  updateUserProfilePic: ({ userId, imageData }) => {
    console.log(userId, imageData[2]);
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.User_Collection)
        .updateOne(
          { _id: new ObjectId(userId) },
          { $set: { image: imageData } }
        )
        .then((response) => {
          resolve({ success: true });
        })
        .catch((error) => {
          reject("Image Updating failed");
        });
    });
  },
};
