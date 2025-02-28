const jwt = require("jsonwebtoken");

/**
 * Middleware to verify and authenticate a JWT token.
 * Extracts the user ID from the token and attaches it to `req.userId`.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.headers - Headers containing the Authorization token.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} - Calls `next()` if the token is valid, otherwise returns a 401 error.
 */

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId  // Attach userId to request for later use
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
