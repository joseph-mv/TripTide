import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
  [key: string]: any;
}


export const generateAccessToken = (user: UserPayload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return jwt.sign(user, secret, { expiresIn: "1800s" });
};


export const generateRefreshToken = (user: UserPayload) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");
  return jwt.sign(user, secret, {
    expiresIn: "7d",
  });
};

export default { generateAccessToken, generateRefreshToken };


