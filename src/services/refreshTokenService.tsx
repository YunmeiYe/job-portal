import axiosInstance from '../config/axiosInstance';
import { clearAuthLocalStorage, getItem, setItem } from '../utils/localStorage';
import { agent } from '../api/agent';
import { getTokenExpiry } from '../utils/common';
import { removeUser, setSessionExpired } from '../store/authSlice';
import store from '../store/store';

let refreshTimeout: ReturnType<typeof setTimeout>;

const scheduleTokenRefresh = () => {
  const expiration = parseInt(getItem("exp") || "0");
  const delay = expiration - 30000; // 30s before expiry

  if (delay > 0) {
    refreshTimeout = setTimeout(async () => {
      try {
        console.log("Refreshing token...");
        const res: any = await agent.Auth.refreshToken();
        const newToken = res.accessToken;
        setItem("accessToken", newToken);
        setItem("exp", getTokenExpiry(newToken));
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        // Schedule the next refresh
        scheduleTokenRefresh();
      } catch (err) {
        console.log("Auto-refresh failed", err);
        store.dispatch(removeUser());
        store.dispatch(setSessionExpired(true));
        clearAuthLocalStorage();
        stopTokenRefreshTimer();
      }
    }, delay);
  }
};

const stopTokenRefreshTimer = () => {
  clearTimeout(refreshTimeout);
};

export { scheduleTokenRefresh, stopTokenRefreshTimer };