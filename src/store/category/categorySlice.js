import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    currentCategory: localStorage.getItem("category")
      ? localStorage.getItem("category")
      : "all"
  },
  reducers: {
    selectCategory: (state, action) => {
      state.currentCategory = action.payload;
      localStorage.setItem("category", state.currentCategory);
    }
  }
});

export const { selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
