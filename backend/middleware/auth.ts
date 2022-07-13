import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { ErrorResponse } from "../utils/errResponse";
import { NextFunction, Request, Response } from "express";

export const authenticate = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token: string | undefined;

    console.log("Trigger AUTH middleware".green.bold);

    // console.log("Request cookies: middleware", req.cookies);

    let authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
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
      const decoded: string | jwt.JwtPayload = jwt.verify(
        token,
        `${
          authHeader
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET
        }`
      );

      (req as any).user = await User.findById((decoded as any).id);
      next();
    } catch (error: any) {
      return next(
        new ErrorResponse({
          message: "Not authorized to access this route",
          code: 401,
        })
      );
    }
  }
);

// role authorization,yet to implement
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
