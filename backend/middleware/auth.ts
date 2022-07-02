import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { ErrorResponse } from "../utils/errResponse.js";
import { NextFunction, Request, Response } from "express";

export const authenticate = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new ErrorResponse({
          message: "Not authorized to access this route",
          code: 401,
        })
      );
    }

    try {
      // verify token
      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);

      (req as any).user = await User.findById((decoded as any).id);
      next();
    } catch (error) {
      return next(
        new ErrorResponse({
          message: "Not authorized to access this route",
          code: 401,
        })
      );
    }
  }
);

export const authorize = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse({
          message: "User is not authorized to access this route",
          code: 401,
        })
      );
    }
    next();
  };
};
