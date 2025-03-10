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

export { registerUser, loginUser }