import axios from 'axios'

const base_url = "http://localhost:8080/jobs/"

const postJob = async (job: any) => {
  try {
    const result = await axios.post(`${base_url}post`, job);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const getAllJobs = async () => {
  try {
    const result = await axios.get(`${base_url}getAll`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const getJob = async (id: string) => {
  try {
    const result = await axios.get(`${base_url}get/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { postJob, getAllJobs, getJob }