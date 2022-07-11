import { NextFunction, Request, Response } from "express";
import Stats from "../models/Stats";
import User from "../models/User";

export interface CustomRequest extends Request {}

interface GuessDist {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
}

// @desc    Get User Stats
// @route   GET /api/v1/stats
// @access  Private
export const getUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqs = req.body;

  const userStats = await Stats.findById((req as any).user.id);
};

// @desc    Update User Stats
// @route   PUT /api/v1/stats
// @access  Private
export const updateUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // increment attempt by one
  // increment streak if won
  // check if current streak is higher than max streak
  // update guess distribution

  const { streak, guessedInAttempt, isWon } = req.body;

  const userStats = await Stats.findOne({ user: (req as any).user._id });

  console.log("UPDATE USERS STATS ENDPOINT".black.bold);

  // const guessDistribution: GuessDist = {
  //   "1": 0,
  //   "2": 0,
  //   "3": 0,
  //   "4": 0,
  //   "5": 0,
  //   "6": 0,
  // };

  if (userStats !== null) {
    const positionToInc: number = parseInt(
      Object.keys(userStats.guessDistribution)[guessedInAttempt - 1]
    );

    (userStats.guessDistribution as any)[positionToInc] += 1;
  }

  // check if won

  // const updatedUserStats = await Stats.findOneAndUpdate(
  //   { user: (req as any).user._id },
  //   {
  //     $inc: { attempts: 1, numOfWins: 1 },
  //     currentStreak: streak,
  //     guessDistribution: userStats?.guessDistribution,
  //   },
  //   { new: true }
  // );

  console.log("Updated users stats:");

  res.status(200).json({ success: true });
};
