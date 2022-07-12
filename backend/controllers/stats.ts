import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import Stats, { StatsT } from "../models/Stats";

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
  // exclude user and _id field from response
  const userStats = await Stats.findOne({ user: (req as any).user._id }).select(
    ["-user", "-_id"]
  );

  if (!userStats) {
    return res
      .status(404)
      .json({ success: true, message: "User stats not found" });
  }

  return res.status(200).json({ success: true, data: userStats });
};

// @desc    Update User Stats
// @route   PUT /api/v1/stats
// @access  Private
export const updateUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { streak, guessedInAttempt, isWon } = req.body;

  const userStats:
    | (StatsT & {
        _id: Types.ObjectId;
      })
    | null = await Stats.findOne({ user: (req as any).user._id });

  // const guessDistribution: GuessDist = {
  //   "1": 0,
  //   "2": 0,
  //   "3": 0,
  //   "4": 0,
  //   "5": 0,
  //   "6": 0,
  // };

  if (!userStats) {
    return res.status(404).json({ message: "User stats not found" });
  }

  // increment position by one in which attempt you guessed the word
  if (guessedInAttempt !== 0) {
    const positionToInc: number = parseInt(
      Object.keys(userStats.guessDistribution)[guessedInAttempt - 1]
    );

    (userStats.guessDistribution as any)[positionToInc] += 1;
  }

  // increment attempts by one
  // increment numOfWins by one,if won
  const updatedUserStats = await Stats.findOneAndUpdate(
    { user: (req as any).user._id },
    {
      $inc: { attempts: 1, numOfWins: isWon ? 1 : 0 },
      currentStreak: isWon ? streak : 0,
      guessDistribution: userStats?.guessDistribution,
    },
    { new: true }
  );

  res.status(200).json({ success: true, updatedUserStats });
};
