import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
  [key: string]: any;
}

/**
 * Generates a new JWT access token for authentication.
 * @param {Object} user - The user object containing user details.
 * @param {string} user.userId - The unique ID of the user.
 * @returns {string} - The generated JWT access token.
 */
export const generateAccessToken = (user: UserPayload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(user, secret, { expiresIn: "1800s" });
};

/**
 * Generates a new JWT refresh token for extending user sessions.
 */
export const generateRefreshToken = (user: UserPayload) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");
  return jwt.sign(user, secret, {
    expiresIn: "7d",
  });
};

export default { generateAccessToken, generateRefreshToken };


