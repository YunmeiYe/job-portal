import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../Interceptor/AxiosInterceptor';
import { navigateToLogin } from './AuthService';

let refreshTimeout: ReturnType<typeof setTimeout>;

export const scheduleTokenRefresh = (navigate: any) => {
  const expiration = parseInt(localStorage.getItem("expiresIn") || "0");
  // const now = Date.now();
  const delay = expiration - 30000; // 30s before expiry

  if (delay > 0) {
    refreshTimeout = setTimeout(async () => {
      try {
        console.log("Refreshing token...");
        const response = await axiosInstance.post(`/api/auth/refresh-token`, null);
        const newToken = response.data.accessToken;
        const decoded = jwtDecode(newToken);
        let expiresIn = 0;
        if (decoded.exp && decoded.iat) {
          expiresIn = (decoded.exp - decoded.iat) * 1000;
        }
        localStorage.setItem("accessToken", newToken);
        localStorage.setItem("expiresIn", expiresIn.toString());
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        // Schedule the next refresh
        scheduleTokenRefresh(navigate);
      } catch (err) {
        console.log("Auto-refresh failed", err);
        navigateToLogin(navigate);
      }
    }, delay);
  }
};

export const clearTokenRefreshTimer = () => {
  clearTimeout(refreshTimeout);
};