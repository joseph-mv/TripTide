const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const db = require("../config/connection");
const sendOtp = require("../utils/sendOtp");
const collection = require("../config/collection");
const sendVerificationEmail = require("../utils/authUtils");

module.exports = {

  login: (user) => {
    return new Promise(async (resolve, reject) => {
      existingUser = await db
        .get()
        .collection(collection.User_Collection)
        .findOne({ isVerified: true, email: user.email });

      if (existingUser) {
        if (await bcrypt.compare(user.password, existingUser.password)) {
          resolve({
            status: true,
            userName: existingUser.name,
            userId: existingUser._id,
            image: existingUser.image,
            email: existingUser.email,
          });
        } else {
          reject({ status: false });
        }
      } else {
        reject({ status: false });
      }
    });
  },
  forgotPassword: ({ email }) => {
    return new Promise(async (resolve, reject) => {
      const user = await db
        .get()
        .collection(collection.User_Collection)
        .findOne({ email });
      // console.log(user);
      if (!user) {
        reject({ error: "No user found with this email" });
      } else {
        const otp = crypto.randomInt(1000, 9999).toString(); // Generate a 4-digit OTP
        const expirationTime = Date.now() + 3600000; // 1 hour
        await db
          .get()
          .collection(collection.User_Collection)
          .updateOne(
            { email },
            {
              $set: {
                resetPasswordOtp: otp,
                resetPasswordExpires: expirationTime,
              },
            }
          );
        const otpRes = await sendOtp(email, otp);
        resolve(otpRes);
      }
    });
  },
  resetPassword: async ({ email, otp, newPassword }) => {
    try {
      // Find user with valid OTP and check if it's not expired
      const user = await db
        .get()
        .collection(collection.User_Collection)
        .findOne({
          email,
          resetPasswordOtp: otp,
          resetPasswordExpires: { $gt: Date.now() }, // Check if OTP is still valid
        });

      if (!user) {
        throw { error: "Invalid OTP or OTP has expired" }; // Proper error throwing
      }

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update user password and reset OTP fields
      await db
        .get()
        .collection(collection.User_Collection)
        .updateOne(
          { email },
          {
            $set: {
              password: hashedPassword,
              resetPasswordOtp: null,
              resetPasswordExpires: null,
            },
          }
        );

      return { success: true }; // No need to use resolve()
    } catch (err) {
      throw { error: "Database error", details: err }; // Proper error handling
    }
  },

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
