import axios from 'axios'

const base_url = "http://localhost:8080/users/"

const registerUser = async (user: any) => {
  try {
    const result = await axios.post(`${base_url}register`, user);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const loginUser = async (login: any) => {
  try {
    const result = await axios.post(`${base_url}login`, login);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const sendOtp = async (email: any) => {
  try {
    const result = await axios.post(`${base_url}sendOtp/${email}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const verifyOtp = async (email: any, otp: any) => {
  try {
    const result = await axios.post(`${base_url}verifyOtp/${email}/${otp}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const changePass = async (email: any, password: any) => {
  try {
    const result = await axios.post(`${base_url}changePass`, { email, password });
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { registerUser, loginUser, sendOtp, verifyOtp, changePass }