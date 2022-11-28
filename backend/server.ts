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
import auth from "./routes/auth";
import stats from "./routes/stats";
import path from "path";

dotenv.config();
connectDB();

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req: Request, res: any) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
