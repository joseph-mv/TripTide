import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
}

const EXPIRATION_TIME = "60s";
const REFRESH_EXPIRATION_TIME = "120s";


export const generateAccessToken = (user: UserPayload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(user, secret, { expiresIn: EXPIRATION_TIME });
};


export const generateRefreshToken = (user: UserPayload) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");
  return jwt.sign(user, secret, {
    expiresIn: REFRESH_EXPIRATION_TIME,
  });
};

export default { generateAccessToken, generateRefreshToken };


