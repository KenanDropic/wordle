import allowedOrigins from "../config/allowedOrigins";
import { NextFunction, Request, Response } from "express";

const credentials = (req: Request, res: any, next: NextFunction) => {
  const origin: string | undefined = req.headers.origin;
  if (origin !== undefined) {
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", true);
    }
  }
  console.log("Origin:", origin);
  next();
};

export default credentials;
