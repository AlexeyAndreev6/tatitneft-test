import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { articlesSlice } from "./articles/articlesSlice";

export const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
