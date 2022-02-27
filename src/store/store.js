import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import categoryReducer from "./category/categorySlice";
import currencyReducer from "./currency/currencySlice";
import productReducer from "./product/productSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    currency: currencyReducer,
    product: productReducer
  }
});
