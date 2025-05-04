import { createSlice } from "@reduxjs/toolkit"
import { updateProfile } from "../services/profileService";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    setProfile: (state, action) => {
      state = action.payload;
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  }
})

export const { setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;