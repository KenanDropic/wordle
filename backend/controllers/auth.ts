import jwt from "jsonwebtoken";
import User, { UserT } from "../models/User";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import Stats, { StatsT } from "../models/Stats";

type asyncHandlerTs = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export interface CustomRequest extends Request {}

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body?.username || !req.body?.password || !req.body?.email) {
    return res.status(404).json({ message: "Provide all values" });
  }
  const { username, email, password } = req.body;

  // check for duplicate usernames in the db
  const duplicate:
    | (UserT & {
        _id: Types.ObjectId;
      })
    | null = await User.findOne({ email });

  if (duplicate) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user: UserT & {
    _id: Types.ObjectId;
  } = new User(req.body);

  const stats: StatsT & {
    _id: Types.ObjectId;
  } = new Stats({
    user,
  });

  const access_token: string = user.getAccessToken();
  const refresh_token: string = user.getRefreshToken();

  res.cookie("jwt", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    //maxAge: 60 * 60 * 1000,
  });

  await user.save();
  await stats.save();

  return res.status(201).json({ success: true, access_token });
};

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide all values" });
  }

  const user: UserT | null = await User.findOne({
    email,
  }).exec();

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // evaluate password
  const match: boolean = await user.matchPasswords(password);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // create JWTs
  const access_token: string = user.getAccessToken();
  const refresh_token: string = user.getRefreshToken();

  let newRTArray = !cookies?.jwt
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== cookies.jwt);

  console.log("Cookie jwt:", cookies.jwt);

  if (cookies?.jwt) {
    // 1) User logs in but never uses RT and does not logout
    // 2) RT is stolen
    // 3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in

    const refreshToken = cookies.jwt;
    const foundToken = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundToken) {
      // clear out ALL previous refresh tokens
      newRTArray = [];
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  }

  user.refreshToken = [...newRTArray, refresh_token];
  await user.save();

  // Creates Secure Cookie with refresh token
  res.cookie("jwt", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    //maxAge: 60 * 60 * 1000,
  });

  // Send access token to user
  return res.json({
    accessToken: access_token,
  });
};

// @desc    Get new refresh token
// @route   GET /api/v1/auth/token
// @access  Private
export const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken: string = cookies.jwt;
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  const user:
    | (UserT & {
        _id: Types.ObjectId;
      })
    | null = await User.findOne({ refreshToken }).exec();

  // console.log("FOUND USER", user);

  if (!user) {
    jwt.verify(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`,
      async (
        err: jwt.VerifyErrors | null,
        decoded: string | jwt.JwtPayload | undefined
      ) => {
        if (err) return res.sendStatus(403); //Forbidden
        let hackedUser:
          | (UserT & {
              _id: Types.ObjectId;
            })
          | null;
        // Delete refresh tokens of hacked user
        if (decoded !== undefined) {
          hackedUser = await User.findOne((decoded as any).id);
          if (hackedUser !== null) {
            hackedUser.refreshToken = [];
            await hackedUser.save();
          }
        }
      }
    );
    // console.log("FORBIDEEEEN");
    return res.sendStatus(403); //Forbidden
  }
  const newRTArray = user.refreshToken.filter((rt) => rt !== refreshToken);

  // console.log("New refresh token array:", newRTArray);

  // evaluate jwt
  jwt.verify(
    refreshToken,
    `${process.env.REFRESH_TOKEN_SECRET}`,
    async (
      err: jwt.VerifyErrors | null,
      decoded: string | jwt.JwtPayload | undefined
    ) => {
      if (err) {
        // expired refresh token
        user.refreshToken = [...newRTArray];
        await user.save();
      }
      if (decoded !== undefined) {
        if (user._id != (decoded as any).id) return res.sendStatus(403);
        // console.log("Decoded", decoded);
      }
      // Refresh token was still valid
      const access_token = user.getAccessToken();
      const new_refresh_token = user.getRefreshToken();
      // Saving refreshToken with current user
      user.refreshToken = [...newRTArray, new_refresh_token];
      await user.save();
      // Creates Secure Cookie with refresh token
      res.cookie("jwt", new_refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
      });

      res.json({ accessToken: access_token });
    }
  );
};

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
export const getLoggedUser = asyncHandler(
  async (req: any, res: any, next: NextFunction) => {
    // console.log("Request get logged user:", req.cookies);
    const refreshToken = req.cookies.jwt;

    const currentUser:
      | (UserT & {
          _id: Types.ObjectId;
        })
      | null = await User.findOne({ refreshToken: refreshToken }).select([
      "-password",
      "-refreshToken",
    ]);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, user: currentUser });
  }
);

// @desc    Logout user
// @route   GET /api/v1/auth/logout
// @access  Private
export const handleLogout = async (req: any, res: any) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken: string = cookies.jwt;

  // Is refreshToken in db?
  const user:
    | (UserT & {
        _id: Types.ObjectId;
      })
    | null = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
  await user.save();
  // console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};
