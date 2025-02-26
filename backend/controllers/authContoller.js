const crypto = require("crypto");
const db = require("../config/connection");
const sendOtp = require("../utils/sendOtp");
const collection = require("../config/collection");
const {
  sendVerificationEmail,
  checkExistingUser,
  hashPassword,
} = require("../utils/authUtils");

module.exports = {
  /**
   * @function signUp
   * @description Handles user registration, including password hashing and email verification.
   * @param {Object} req - Express request object containing user data in `req.body`.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - Sends a JSON response with success or error message.
   */
  signUp: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // 1️ Check if the email is already registered
      if (await checkExistingUser(email)) {
        return res
          .status(400)
          .json({ error: "Oops, the email is already used. Try another" });
      }

      // 2️ Hash the password securely before storing in DB
      const hashedPassword = await hashPassword(password);

      // 3️ Generate a unique email verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // 4️ Create a new user object for insertion
      const newUser = {
        name,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false,
        createdAt: new Date(),
      };

      // 5️ Insert user into the database
      const result = await db
        .get()
        .collection(collection.User_Collection)
        .insertOne(newUser);

      if (!result.insertedId)
        res.status(500).json({ error: "Failed to register user!" });

      // 6️ Send verification email with a unique token
      const emailResponse = await sendVerificationEmail(
        email,
        verificationToken
      );

      // 7️ Return success response
      res.status(201).json(emailResponse);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message || "Signup failed!" });
    }
  },
  verifyEmail: (token) => {
    return new Promise(async (resolve, reject) => {
      const user = await db
        .get()
        .collection(collection.User_Collection)
        .findOneAndUpdate(
          { verificationToken: token },
          { $set: { isVerified: true } },
          { returnOriginal: false }
        );
  
      if (!user?.isVerified) {
        reject({ error: "Invalid or expired token" });
      } else {
        resolve({ msg: "Email verified successfully" });
      }
    });
  },
  
};


