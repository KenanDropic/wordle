import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlce";

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: { global: globalReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
