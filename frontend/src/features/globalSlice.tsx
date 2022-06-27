import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  board: string[][];
  currentAttempt: {
    attempt: number;
    letterPosition: number;
  };
}

const initialState: InitialState = {
  board: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  currentAttempt: {
    attempt: 0,
    letterPosition: 0,
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<string>) => {
      const { attempt, letterPosition } = state.currentAttempt;
      state.board[attempt][letterPosition] = action.payload;
    },
    setLetterPosition: (state, action: PayloadAction<string>) => {
      let operator = action.payload;

      state.currentAttempt = {
        ...state.currentAttempt,
        letterPosition:
          operator === "+"
            ? state.currentAttempt.letterPosition + 1
            : state.currentAttempt.letterPosition - 1,
      };
    },
    setAttempt: (state) => {
      state.currentAttempt = {
        ...state.currentAttempt,
        attempt: state.currentAttempt.attempt + 1,
        letterPosition: 0,
      };
    },
  },
});

export const { setBoard, setLetterPosition, setAttempt } = globalSlice.actions;

export default globalSlice.reducer;
