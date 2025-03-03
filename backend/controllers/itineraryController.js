const db = require("../config/connection");
// const promise = require("promise");

const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

module.exports = {
/**
 * @function addItinerary
 * @description Adds a new itinerary to the database.
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Itinerary data from the client.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */
addItinerary: async (req, res) => {
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
  

  /**
   * @function deleteItinerary
   * @description Deletes an itinerary from the database.
   * @param {Object} req - Express request object.
   * @param {string} req.query.id - ID of the itinerary to delete.
   * @param {Object} res - Express response object.
   * @returns {Object} JSON response indicating success or failure.
   */
  deleteItinerary: async (req, res) => {
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
  
  editItinerary: async(req,res) => {
    const { id } = req.query;
    const itinerary=req.body
      await db
        .get()
        .collection(collection.ITINERARY_Collection)
        .updateOne(
          { _id: new ObjectId(id) }, // Find the document by ID
          {
            $set: itinerary, // Update fields with the provided data
          },
          { upsert: false } // Ensure this is only an update, not an insert
        )
        .then((data) => {
          res.status(200).json(true);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
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
editItinerary: async (req, res) => {
  try {
    const { id } = req.query;
    const itinerary = req.body;

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
