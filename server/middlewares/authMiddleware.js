import jwt from "jsonwebtoken";
import { CustomError } from "../utils/errorHandler.js";
import { config } from "dotenv";
config();

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError("Unauthorized", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomError("Invalid token", 401);
  }
};