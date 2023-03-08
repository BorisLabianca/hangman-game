import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import languageReducer from "./languages/languageSlice";
import difficultyReducer from "./difficulty/difficultySlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    difficulty: difficultyReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
