import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    featuredImage: ""
  },
  reducers: {
    setFeaturedImage: (state, action) => {
      state.featuredImage = action.payload;
    }
  }
});

export const { setFeaturedImage } = productSlice.actions;

export default productSlice.reducer;
