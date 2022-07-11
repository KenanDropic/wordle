import express from "express";
import { getUserStats, updateUserStats } from "../controllers/stats";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.use(authenticate);

router.route("/").get(getUserStats).put(updateUserStats);

export default router;
