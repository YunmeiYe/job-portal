import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice"
import filterReducer from "./filterSlice"
import sortReducer from "./sortSlice"
import authReducer from "./authSlice"
import loadingReducer from "./loadingSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
    loading: loadingReducer,
  }
})