import axiosInstance from '../Interceptor/AxiosInterceptor';

const getProfile = async (id: any) => {
  try {
    const result = await axiosInstance.get(`/profiles/get/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const getAllProfiles = async () => {
  try {
    const result = await axiosInstance.get(`/profiles/getAll`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const updateProfile = async (profile: any) => {
  try {
    const result = await axiosInstance.put(`/profiles/update`, profile);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { getProfile, getAllProfiles, updateProfile }