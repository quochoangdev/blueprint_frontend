import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phone: "",
  city: "",
  district: "",
  title: "",
  image: "",
  price: "",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCheckout: (state, action) => {
      console.log(action.payload);
      state.name = action.payload.infoCustomer.name;
      state.phone = action.payload.infoCustomer.phone;
      state.city = action.payload.infoCustomer.city;
      state.district = action.payload.infoCustomer.district;
      state.title = action.payload.productData.title;
      state.image = action.payload.productData.image[0];
      state.price = action.payload.productData.price;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
