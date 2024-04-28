import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  title: "",
  imageAvt: "",
  colors: "",
  capacitys: "",
  price: "",
  slug: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      console.log(action);
    },
  },
});

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
