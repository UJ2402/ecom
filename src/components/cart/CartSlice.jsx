import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    additemtocart: (state, action) => {
      state.items = [
        ...state.items,
        {
          id: action.payload.id,
          count: action.payload.count,
          size: action.payload.size,
        },
      ];
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});


export const {additemtocart, clearCart} = cartSlice.actions;

export const selectCartItems = (state) => state.items;

export default cartSlice.reducer