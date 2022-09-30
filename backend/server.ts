import express, { Application } from "express";
import dotenv from "dotenv";
import "colorts/lib/string";
import color from "colorts";
import { echo } from "colorts";
import connectDB from "./config/db";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";

dotenv.config();
connectDB();

import auth from "./routes/auth";
import stats from "./routes/stats";

const app: Application = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/stats", stats);

app.get("/", (req: Request, res: any) => {
  res.send("API is running...");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  );
});
