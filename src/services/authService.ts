import { createAsyncThunk } from "@reduxjs/toolkit";
import { agent } from "../api/agent";
import { getTokenExpiry, getUserFromToken } from "../utils/common";
import { clearAuthLocalStorage, setAuthLocalStorage } from "../utils/localStorage";
import { stopTokenRefreshTimer, scheduleTokenRefresh } from "./refreshTokenService";

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }) => {
    const result: any = await agent.Auth.loginUser(credentials);
    const user = getUserFromToken(result.accessToken);
    if (user) setAuthLocalStorage(user, result.accessToken, getTokenExpiry(result.accessToken));
    scheduleTokenRefresh();
    return user;
  }
);

const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const result = await agent.Auth.logoutUser();
    clearAuthLocalStorage();
    stopTokenRefreshTimer();
    return result;
  });

const registerUser = async (user: any) => await agent.Auth.registerUser(user);

const sendOtp = async (email: any) => await agent.Auth.sendOtp(email);

const verifyOtp = async (email: any, otp: any) => await agent.Auth.verifyOtp(email, otp);

const changePassword = async (email: any, password: any) => await agent.Auth.changePassword(email, password);

export { loginUser, logoutUser, registerUser, sendOtp, verifyOtp, changePassword }