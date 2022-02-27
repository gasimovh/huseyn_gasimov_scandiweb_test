import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    selectedCurrency: localStorage.getItem("currency")
      ? JSON.parse(localStorage.getItem("currency"))
      : { symbol: "$", label: "USD" }
  },
  reducers: {
    selectCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      localStorage.setItem("currency", JSON.stringify(state.selectedCurrency));
    }
  }
});

export const { selectCurrency } = currencySlice.actions;

export default currencySlice.reducer;
