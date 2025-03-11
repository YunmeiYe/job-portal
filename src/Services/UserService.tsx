import axios from 'axios'

const base_url = "http://localhost:8080/users/"

const registerUser = async (user: any) => {
  try {
    const res = await axios.post(`${base_url}register`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
}

const loginUser = async (login: any) => {
  try {
    const res = await axios.post(`${base_url}login`, login);
    return res.data;
  } catch (error) {
    throw error;
  }
}

const sendOtp = async (email: any) => {
  try {
    const res = await axios.post(`${base_url}sendOtp/${email}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

const verifyOtp = async (email: any, otp: any) => {
  try {
    const res = await axios.post(`${base_url}verifyOtp/${email}/${otp}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

const changePass = async (email: any, password: any) => {
  try {
    const res = await axios.post(`${base_url}changePass`, { email, password });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export { registerUser, loginUser, sendOtp, verifyOtp, changePass }