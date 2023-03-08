import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  level: string;
}

const initialState: InitialState = {
  level:
    (localStorage.getItem("level") && localStorage.getItem("level")) || "easy",
};

const difficultySlice = createSlice({
  name: "difficulty",
  initialState: initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<string>) => {
      if (state.level === action.payload) return;
      else state.level = action.payload;
      localStorage.setItem("level", action.payload);
    },
  },
});

export const { setDifficulty } = difficultySlice.actions;
export const selectDifficulty = (state: RootState) => state.difficulty.level;
export default difficultySlice.reducer;
