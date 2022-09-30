import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatsSliceInitialState, Stats } from "./interfaces";

const initialState: StatsSliceInitialState = {
  stats: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setUserStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setUserStats } = statsSlice.actions;

export default statsSlice.reducer;
