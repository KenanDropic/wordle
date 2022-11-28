import express from "express";
import path from "path";
import {
  handleRefreshToken,
  login,
  register,
  getLoggedUser,
  handleLogout,
} from "../controllers/auth";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/token").get(handleRefreshToken);
router.route("/me").get(authenticate, getLoggedUser);
router.route("/logout").get(authenticate, handleLogout);

export default router;
