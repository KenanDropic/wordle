import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";

export interface UserT extends Document {
  username: string;
  email: string;
  password: string;
  isEmailConfirmed: boolean;
  confirmEmailToken: string;
  confirmEmailExpire: Date;
  role: string;
  refreshToken: string[];
  matchPasswords: (enteredPassword: string) => Promise<boolean>;
  getAccessToken: () => string;
  getRefreshToken: () => string;
}

const UserSchema: Schema = new Schema<UserT>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        "Must contain at least 6 characters,uppercase,lowercase letter,special character and number",
      ],
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    confirmEmailToken: String,
    confirmEmailExpire: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: [String],
  },
  {
    versionKey: false,
  }
);

// Encrypting password using bcryptjs
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt: string = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// check if password matches
UserSchema.methods.matchPasswords = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// access token
UserSchema.methods.getAccessToken = function () {
  return jwt.sign({ id: this.id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

// refresh token
UserSchema.methods.getRefreshToken = function () {
  return jwt.sign({ id: this.id }, `${process.env.REFRESH_TOKEN_SECRET}`);
};

export default mongoose.model<UserT>("User", UserSchema);
