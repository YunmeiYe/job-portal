import { createSlice } from "@reduxjs/toolkit"
import { getItem } from "../utils/localStorage";
import { loginUser, logoutUser } from "../services/authService";

const user = getItem("user");
const initialState = user ? { user, isLoggedIn: true, sessionExpired: false, } : { user: null, isLoggedIn: false, sessionExpired: false }

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
  },
})

export const { removeUser, setSessionExpired } = authSlice.actions;
export default authSlice.reducer;