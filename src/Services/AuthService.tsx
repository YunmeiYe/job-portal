import axios from 'axios'

const base_url = "http://localhost:8080/api/auth/"

const loginUser = async (login: any) => {
  try {
    const result = await axios.post(`${base_url}login`, login);
    const { accessToken, expiresIn } = result.data;
    const expirationTime = Date.now() + expiresIn;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expiresIn", expirationTime.toString());
    return result.data;
  } catch (error) {
    throw error;
  }
}

const navigateToLogin = (navigate: any) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("user");
  navigate('/login');
}

export { loginUser, navigateToLogin }
