import { configureStore } from "@reduxjs/toolkit";
import checkoutSlice from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    checkout: checkoutSlice,
  },
});
