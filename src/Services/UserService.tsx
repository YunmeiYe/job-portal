import axiosInstance from "../Interceptor/AxiosInterceptor";

const login = async (login: any) => {
  const result = await axiosInstance.post(`/api/auth/login`, login);
  return result.data;
}

const registerUser = async (user: any) => {
  try {
    const result = await axiosInstance.post(`/api/auth/register`, user);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const sendOtp = async (email: any) => {
  try {
    const result = await axiosInstance.post(`/api/auth/send-otp/${email}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const verifyOtp = async (email: any, otp: any) => {
  try {
    const result = await axiosInstance.post(`/api/auth/verifyOtp/${email}/${otp}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const changePass = async (email: any, password: any) => {
  try {
    const result = await axiosInstance.post(`/api/auth/changePass`, { email, password });
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { login, registerUser, sendOtp, verifyOtp, changePass }