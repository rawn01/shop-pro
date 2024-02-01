import { createSlice } from "@reduxjs/toolkit";

export interface ICartState {
  cartItems: IProduct[];
  itemsPrice?: string;
  shippingPrice?: string;
  taxPrice?: string;
  totalPrice?: string;
  shippingAddress: { city: string, address: string, country: string, postalCode: string };
  paymentMethod: string;
}

const initialState: ICartState = localStorage.getItem("cart") ? 
  (JSON.parse(localStorage.getItem("cart")!) as ICartState) : 
  { cartItems: [], shippingAddress: { city: "", address: "", postalCode: "", country: "" }, paymentMethod: "PayPal" };

const addDecimals = (num: number) => {
  return Math.round((num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((cartItem) => cartItem._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) => {
          return cartItem._id === existItem._id ? item : cartItem
        });
      } else {
        state.cartItems.push(item);
      }

      const itemsPrice = state.cartItems.reduce((acc: number, cartItem) => {
        return acc + (cartItem.price * cartItem.qty!);
      }, 0);

      state.itemsPrice = addDecimals(itemsPrice);
      // If order over 100 then 10 shipping charge else free
      state.shippingPrice = addDecimals(+state.itemsPrice > 100 ? 0 : 10);
      // Tax Price (15% tax)
      state.taxPrice = addDecimals(Number(0.15 * +state.itemsPrice));
      // Total Price
      const totalPrice = +state.itemsPrice + +state.shippingPrice + +state.taxPrice;
      state.totalPrice = Number(totalPrice).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== id);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItems = [];

      localStorage.setItem("cart", JSON.stringify(state));
    }
  }
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;