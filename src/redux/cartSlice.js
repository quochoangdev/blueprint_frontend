import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCheckout: {}
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCheckout: (state, action) => {
      state.dataCheckout = action.payload
      localStorage.setItem("dataCheckout", JSON.stringify(action.payload))
    },
  },
});

export const { addCheckout } = cartSlice.actions;
export default cartSlice.reducer;
