import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface InitialState {
  theme: string;
}
// const getTheme = () => {
//   if (localStorage.getItem("theme")) {
//     return localStorage.getItem("theme");
//   } else {
//     return "system";
//   }
// };
const initialState: InitialState = {
  theme:
    (localStorage.getItem("theme") && localStorage.getItem("theme")) ||
    "system",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
export default themeSlice.reducer;
