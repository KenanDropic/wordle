import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  board: string[][];
}

const initialState: InitialState = {
  board: [
    ["F", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<string[][]>) => {
      console.log(action.payload);
      state.board = action.payload;
    },
  },
});

export default globalSlice.reducer;
