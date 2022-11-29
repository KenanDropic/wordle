import { Types } from "mongoose";

/* GLOBAL SLICE */
interface Words {
  wordSet: Set<any>;
  todaysWord: string;
}
interface GameOver {
  isOver: boolean;
  isWon: boolean;
}
interface GlobalSliceInitialState {
  board: string[][];
  currentAttempt: {
    attempt: number;
    letterPosition: number;
  };
  words: Words;
  disabledLetters: string[];
  gameOver: GameOver;
  displayRules: boolean;
  displaySettings: boolean;
  lightTheme: string | boolean;
  displayStats: boolean;
}
/* AUTH SLICE */
interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isEmailConfirmed: boolean;
  role: string;
  refreshToken: string[];
}

interface AuthSliceInitialState {
  user: User | null;
  access_token: string | null;
}

/* STATS SLICE */
interface Stats {
  attempts: number;
  currentStreak: number;
  guessDistribution: {};
  maxStreak?: number;
  winRate: number;
  numOfWins: number;
}

interface StatsSliceInitialState {
  stats: Stats | null;
}

/* AUTH API SLICE */
interface UserPayload {
  success: boolean;
  user: User;
}
interface ResponseMessage {
  success: boolean;
  accessToken: string;
}

export type {
  GameOver,
  GlobalSliceInitialState,
  User,
  AuthSliceInitialState,
  Stats,
  StatsSliceInitialState,
  UserPayload,
  ResponseMessage,
};
