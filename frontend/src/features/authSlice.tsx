import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSliceInitialState, User } from "./interfaces";

const initialState: AuthSliceInitialState = {
  user: null,
  access_token: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.access_token = action.payload.accessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.access_token = null;
      localStorage.removeItem("token");
      localStorage.setItem("logged_in", "false");
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
