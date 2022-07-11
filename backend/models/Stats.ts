import mongoose, { Document, Schema, Types } from "mongoose";

export interface StatsT extends Document {
  user?: Types.ObjectId;
  attempts: number;
  guessDistribution: object;
  numOfWins: number;
  currentStreak: number;
  maxStreak: number;
}

const StatsSchema: Schema = new Schema<StatsT>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    guessDistribution: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
      6: { type: Number, default: 0 },
    },

    numOfWins: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    maxStreak: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

// StatsSchema.pre("save", function () {});

export default mongoose.model<StatsT>("Stats", StatsSchema);
