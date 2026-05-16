import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

function parseBearerToken(authHeader?: string): string | null {
  if (!authHeader) return null;

  // Split on whitespace (handles multiple spaces)
  const [scheme, token, ...rest] = authHeader.trim().split(/\s+/);

  // Must be exactly 2 parts
  if (!scheme || !token || rest.length > 0) return null;

  // Case-insensitive scheme check (per spec)
  if (scheme.toLowerCase() !== "bearer") return null;

  return token;
}



function verifyToken(req: Request, res: Response, next: NextFunction) {
  // const token = req.headers["authorization"];

  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return errorResponse(res, "No token provided", 401);
  }
  // Extract the token whether it has the "Bearer " prefix or not
  const token = parseBearerToken(authHeader);


  if (!token) {
    return errorResponse(res, "Invalid token format", 401);
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
    return errorResponse(res, "Invalid or expired token", 401, error);
  }
}

export default verifyToken;


