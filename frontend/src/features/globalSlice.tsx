import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import words from "../words-data.txt";

interface Words {
  wordSet: Set<any>;
  todaysWord: string;
}

type grwFnc = () => object;

interface GameOver {
  isOver: boolean;
  isWon: boolean;
}

interface InitialState {
  board: string[][];
  currentAttempt: {
    attempt: number;
    letterPosition: number;
  };
  words: Words;
  disabledLetters: string[];
  gameOver: GameOver;
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
  gameOver: {
    isOver: false,
    isWon: false,
  },
};

export const getRandomWord: AsyncThunk<
  | {
      resultArray: string[];
      todaysWord: string;
    }
  | undefined,
  void,
  {}
> = createAsyncThunk("words/getRandom", async () => {
  try {
    let todaysWord: string;
    const data: Response = await fetch(words);
    const result: string = await data.text();
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
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.gameOver.isOver = true;
      state.gameOver.isWon = action.payload;
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
  setGameOver,
} = globalSlice.actions;

export default globalSlice.reducer;
