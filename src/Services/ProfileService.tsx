import axios from 'axios'

const base_url = "http://localhost:8080/profiles/"

const getProfile = async (id: any) => {
  try {
    const result = await axios.get(`${base_url}get/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const getAllProfiles = async () => {
  try {
    const result = await axios.get(`${base_url}getAll`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const updateProfile = async (profile: any) => {
  try {
    const result = await axios.put(`${base_url}update`, profile);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { getProfile, getAllProfiles, updateProfile }