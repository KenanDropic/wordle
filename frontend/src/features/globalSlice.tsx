import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import words from "../words-data.txt";

interface Words {
  wordSet: Set<any>;
  todaysWord: string;
}

interface InitialState {
  board: string[][];
  currentAttempt: {
    attempt: number;
    letterPosition: number;
  };
  words: Words;
  disabledLetters: string[];
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
  words: {
    wordSet: new Set(),
    todaysWord: "",
  },
  disabledLetters: [],
};

export const getRandomWord = createAsyncThunk("words/getRandom", async () => {
  try {
    let todaysWord;
    const data = await fetch(words);
    const result = await data.text();
    const resultArray = result.split("\n");
    todaysWord = resultArray[Math.floor(Math.random() * resultArray.length)];

    return { resultArray, todaysWord };
  } catch (error: any) {
    console.log(error.message);
  }
});

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
    setDisabledLettersArray: (state, action: PayloadAction<string>) => {
      state.disabledLetters = [...state.disabledLetters, action.payload];
    },
  },
  extraReducers(builder) {
    builder.addCase(getRandomWord.fulfilled, (state, action) => {
      if (
        action.payload?.todaysWord !== undefined &&
        action.payload.resultArray.length > 0
      ) {
        state.words.todaysWord = action.payload?.todaysWord.trim();
        state.words.wordSet = new Set(action.payload?.resultArray);
      }
    });
  },
});

export const {
  setBoard,
  setLetterPosition,
  setAttempt,
  setDisabledLettersArray,
} = globalSlice.actions;

export default globalSlice.reducer;
