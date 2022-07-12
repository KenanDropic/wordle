import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Stats {
  attempts: number;
  currentStreak: number;
  guessDistribution: {};
  maxStreak?: number;
  winRate: number;
  numOfWins: number;
}

interface InitialState {
  stats: Stats | null;
}

const initialState: InitialState = {
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
