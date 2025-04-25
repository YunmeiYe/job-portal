import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  accessToken: localStorage.getItem("accessToken") || "",
  expiresIn: localStorage.getItem("expiresIn") || "0",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authTokenChange: (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("expiresIn", action.payload.expiresIn);
      state.accessToken = action.payload.accessToken;
      state.expiresIn = action.payload.expiresIn;
    },
    removeAuthToken: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiresIn");
      state.accessToken = "";
      state.expiresIn = "0";
    },
  }
})

export const { authTokenChange, removeAuthToken } = AuthSlice.actions;
export default AuthSlice.reducer;