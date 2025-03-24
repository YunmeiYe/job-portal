import axiosInstance from "../Interceptor/AxiosInterceptor";


const registerUser = async (user: any) => {
  try {
    const result = await axiosInstance.post(`/users/register`, user);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const sendOtp = async (email: any) => {
  try {
    const result = await axiosInstance.post(`/users/sendOtp/${email}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const verifyOtp = async (email: any, otp: any) => {
  try {
    const result = await axiosInstance.post(`/users/verifyOtp/${email}/${otp}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const changePass = async (email: any, password: any) => {
  try {
    const result = await axiosInstance.post(`/users/changePass`, { email, password });
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { registerUser, sendOtp, verifyOtp, changePass }