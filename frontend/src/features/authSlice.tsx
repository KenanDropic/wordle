import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isEmailConfirmed: boolean;
  role: string;
  refreshToken: string[];
}

interface InitialState {
  user: User | null;
  access_token: string | null;
}

const initialState: InitialState = {
  user: null,
  access_token: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null,
};

type recievedPayload = {
  access_token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      // console.log("ACTION PAYLOAD:", action.payload);
      state.access_token = action.payload.accessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.access_token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action: PayloadAction<User>) => {
      // console.log("User data:", action.payload);
      state.user = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
