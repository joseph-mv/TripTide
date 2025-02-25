const jwt = require("jsonwebtoken");

/**
 * Generates a new JWT access token for authentication.
 * @param {Object} user - The user object containing user details.
 * @param {string} user.userId - The unique ID of the user.
 * @returns {string} - The generated JWT access token.
 */
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1800s" });
};

/**
 * Generates a new JWT refresh token for extending user sessions.
 */
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
