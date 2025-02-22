const db = require('../config/connection')
const collection = require("../config/collection");
const { ObjectId } = require('mongodb');

module.exports = {
    searchUsers: async ({ query }) => {
        try {
            if (!query) {
                return { status: 400, data: { error: "Query parameter is required" } };
            }

            const users = await db.get().collection(collection.User_Collection).find({
                $or: [
                    { name: { $regex: query, $options: "i" } },   // Case-insensitive name search
                    { email: { $regex: query, $options: "i" } }   // Case-insensitive email search
                ]
            }).toArray();

            if (users.length === 0) {
                return { status: 404, data: { message: "No users found" } }; // Return 404 if no users found
            }

            return { status: 200, data: users }; // ✅ Success response
        } catch (error) {
            // console.error("Error searching users:", error);
            return { status: 500, data: { error: "Internal server error" } };
        }
    }
};

