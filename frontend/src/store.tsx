import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlice";
import { enableMapSet } from "immer";

enableMapSet();
const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: { global: globalReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["global/setWordSet", "words/getRandom/fulfilled"],
        ignoredPaths: ["global.words.wordSet"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
