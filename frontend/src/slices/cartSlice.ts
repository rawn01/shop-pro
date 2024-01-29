import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : { cartItems: [] };

const addDecimals = (num: number) => {
  return Math.round((num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((cartItem: any) => cartItem._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem: any) => {
          return cartItem._id === existItem._id ? item : cartItem
        });
      } else {
        state.cartItems.push(item);
      }

      const itemsPrice = state.cartItems.reduce((acc: number, cartItem: any) => {
        return acc + (cartItem.price * cartItem.qty);
      }, 0);
      state.itemsPrice = addDecimals(itemsPrice);

      // If order over 100 then 10 shipping charge else free
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Tax Price (15% tax)
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

      // Total Price
      state.totalPrice = Number(state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state: any, action: any) => {
      const id = action.payload;

      // const idx = state.cartItems.indexOf((cartItem: any) => cartItem._id === id);
      // if(idx !== -1) {
      //   state.cartItems = state.cartItems.splice(idx, 1);
      // }

      state.cartItems = state.cartItems.filter((cartItem: any) => cartItem._id !== id);

      localStorage.setItem("cart", JSON.stringify(state));
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;