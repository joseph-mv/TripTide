import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

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
    return res.status(401).json({ error: "No token provided" });
  }
  // Extract the token whether it has the "Bearer " prefix or not
  const token = parseBearerToken(authHeader);


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


