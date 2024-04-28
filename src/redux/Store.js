import { configureStore } from "@reduxjs/toolkit";
import checkoutSlice from "./checkoutSlice";
import cartSliceReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    checkout: checkoutSlice,
    cart: cartSliceReducer,
  },
});
