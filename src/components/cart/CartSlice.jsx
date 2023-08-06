import { createSlice } from "@reduxjs/toolkit";

export const calculateCartTotal = (items, all_products) => {
  let total = 0;
  Object.keys(items).forEach((key) => {
    const count = items[key];
    const [id] = key.split("_");
    const productInfo = all_products[id];
    if (productInfo) {
      total += productInfo.price * count;
    }
  });
  return total;
};


export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
  },
  reducers: {
    additemtocart: (state, action) => {
      state.items[action.payload.key] =
        (state.items[action.payload.key]
          ? state.items[action.payload.key]
          : 0) + action.payload.count;
    },
    removeItemFromCart: (state, action) => {
      state.items[action.payload] = 0;
    },
    clearCart: (state) => {
      state.items = {};
    },
    clearCartData: (state) => {
      state.items ={};
    },
    setUserCart: (state, action) => {
      state.items = action.payload;
    }
  },
});



export const { additemtocart, clearCart, removeItemFromCart, clearCartData, setUserCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.items;

export default cartSlice.reducer;
