import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

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

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    req.userId = decoded.userId  // Attach userId to request for later use
    next(); // Proceed to the next middleware
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default verifyToken;


