import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import profileReducer from "./profileSlice"
import filterReducer from "./filterSlice"
import sortReducer from "./sortSlice"
import authReducer from "./authSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
    auth: authReducer
  }
})