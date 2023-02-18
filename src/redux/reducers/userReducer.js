import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "login",
  initialState: {
    login: false,
  },
  reducers: {
    setLogin: (state) => {
      state.login = true;
    },
    outLogin: (state) => {
      state.login = false;
    },
  },
});
export const { setLogin, outLogin } = userReducer.actions;
export default userReducer.reducer;
