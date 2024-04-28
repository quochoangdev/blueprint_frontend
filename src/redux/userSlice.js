import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  lastName: "",
  firstName: "",
  alert: "",
  email: "",
  message: "",
  mobile: "",
  token: "",
  refreshToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state._id = action.payload._id;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.alert = action.payload.alert;
      state.email = action.payload.email;
      state.message = action.payload.message;
      state.mobile = action.payload.mobile;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { loginRedux } = userSlice.actions;
export default userSlice.reducer;
