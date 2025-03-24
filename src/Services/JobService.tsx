import axiosInstance from "../Interceptor/AxiosInterceptor";

const postJob = async (job: any) => {
  try {
    const result = await axiosInstance.post(`/jobs/post`, job);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const getAllJobs = async () => {
  try {
    const result = await axiosInstance.get(`/jobs/getAll`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const getJob = async (id: any) => {
  try {
    const result = await axiosInstance.get(`/jobs/get/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const applyJob = async (id: any, applicant: any) => {
  try {
    const result = await axiosInstance.post(`/jobs/apply/${id}`, applicant);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const getJobPostedBy = async (id: any) => {
  try {
    const result = await axiosInstance.get(`/jobs/postedBy/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const changeAppStatus = async (application: any) => {
  try {
    const result = await axiosInstance.post(`/jobs/changeAppStatus`, application);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus }