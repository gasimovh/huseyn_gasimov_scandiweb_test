import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [],
    selectedAttributes: []
  },
  reducers: {
    addToCart: (state, action) => {
      //set default attributes and create unique cart item identifier
      let uid = action.payload.product.id;
      if (state.selectedAttributes.length === 0) {
        action.payload.product.attributes.map((attribute) => {
          state.selectedAttributes.push({
            value: attribute.items[0].value,
            name: attribute.name,
            productId: action.payload.product.id
          });
          uid += attribute.name + attribute.items[0].value;
        });
      } else {
        state.selectedAttributes.map((attribute) => {
          uid += attribute.name + attribute.value;
        });
      }

      //exludes duplicate items
      const index = state.items.findIndex((item) => item.cartItemId === uid);
      if (index >= 0) {
        state.items[index].quantity += 1;
      } else {
        state.items.push({
          cartItemId: uid,
          productId: action.payload.product.id,
          prices: action.payload.product.prices,
          attributes: state.selectedAttributes,
          quantity: 1
        });
      }

      state.selectedAttributes = [];
      // console.log(state.selectedAttributes);

      //TOASTIFY
      toast.success("Product is added to the cart 👍", {
        position: "bottom-right",
        autoClose: 3000
      });

      localStorage.setItem("items", JSON.stringify(state.items));
    },
    increaseQty: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.cartItemId === action.payload.cartItemId
      );
      state.items[index].quantity += 1;

      localStorage.setItem("items", JSON.stringify(state.items));
    },
    decreaseQty: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.cartItemId === action.payload.cartItemId
      );
      //auto removes the item from cart
      if (state.items[index].quantity <= 1) {
        state.items = state.items.filter(
          (item) => item.cartItemId !== action.payload.cartItemId
        );

        localStorage.setItem("items", JSON.stringify(state.items));
        return;
      }
      state.items[index].quantity -= 1;

      localStorage.setItem("items", JSON.stringify(state.items));
    },
    setAttribute: (state, action) => {
      //stores selected attributes in PDP
      const index = state.selectedAttributes.findIndex(
        (attribute) =>
          attribute.attributeId ===
          action.payload.productId + action.payload.name
      );

      if (index >= 0) {
        state.selectedAttributes[index].value = action.payload.value;
      } else {
        state.selectedAttributes.push({
          ...action.payload,
          attributeId: action.payload.productId + action.payload.name
        });
      }
    },
    resetSelectedAttributes: (state, action) => {
      //clearing selectedAttributes array. *used in PLP to help implement the default attributes
      state.selectedAttributes = [];
    }
  }
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  setAttribute,
  resetSelectedAttributes
} = cartSlice.actions;

export default cartSlice.reducer;
