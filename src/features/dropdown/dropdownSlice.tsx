import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    toggleDropdown: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleDropdown } = dropdownSlice.actions;
export const selectDropdown = (state: RootState) => state.dropdown.isOpen;
export default dropdownSlice.reducer;
