import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/userModel";

export const protect = asyncHandler(async (req, res, next) => {
  // Read jwt from cookie
  let token = req.cookies.jwt;

  if(!token) {
    res.status(401);
    throw new Error("Not authorized, token not valid");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;

    next();
  } catch(ex) {    
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
});