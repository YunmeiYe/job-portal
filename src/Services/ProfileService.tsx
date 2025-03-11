import axios from 'axios'

const base_url = "http://localhost:8080/profiles/"

const getProfile = async (id: number) => {
  try {
    const res = await axios.get(`${base_url}get/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

const updateProfile = async (profile: any) => {
  try {
    const res = await axios.put(`${base_url}update`, profile);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export { getProfile, updateProfile }