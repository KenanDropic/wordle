import express from "express";
import dotenv from "dotenv";
import "colorts/lib/string";
import color from "colorts";
import { echo } from "colorts";

dotenv.config();

const app = express();

app.get("/", (req: Request) => {});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  );
});
