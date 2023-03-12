import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  isOpen: boolean;
}

const initialState: InitialState = {
  isOpen: false,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleDropdown } = dropdownSlice.actions;
export const selectDropdown = (state: RootState) => state.dropdown.isOpen;
export default dropdownSlice.reducer;
