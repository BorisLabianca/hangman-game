import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface InitialState {
  language: string;
}
const initialState: InitialState = {
  language:
    (localStorage.getItem("language") && localStorage.getItem("language")) ||
    "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchLanguage: (state, action: PayloadAction<string>) => {
      if (state.language === action.payload) return;
      else state.language = action.payload;
    },
  },
});

export const { switchLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) => state.language.language;
export default languageSlice.reducer;
