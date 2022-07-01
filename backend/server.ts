import express from "express";
import dotenv from "dotenv";
import "colorts/lib/string";
import color from "colorts";
import { echo } from "colorts";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: any) => {
  res.send("API is running...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  );
});
