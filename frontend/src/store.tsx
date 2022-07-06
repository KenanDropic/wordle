import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlice";
import authReducer from "./features/authSlice";
import { apiSlice } from "./app/api/apiSlice";
import { enableMapSet } from "immer";

enableMapSet();
const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["global/setWordSet", "words/getRandom/fulfilled"],
        ignoredPaths: ["global.words.wordSet"],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
