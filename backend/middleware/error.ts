import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errResponse";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(
    new ErrorResponse({ message: `Not Found - ${req.originalUrl}`, code: 404 })
  );
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for developer
  console.log(err.stack?.red);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse({ message, code: 404 }); //instanciramo objekat klase ErrorResponse,proslijeđujemo message i statusCode.
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse({ message, code: 404 });
  }

  //Mongoose validation error(missing field error)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message);
    console.log(message);
    // error = new ErrorResponse({ message, code: 404 });
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

export { notFound, errorHandler };
