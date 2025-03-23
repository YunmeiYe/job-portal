import axios from 'axios'

const base_url = "http://localhost:8080/notifications/"

const getNotifications = async (id:any) => {
  try {
    const result = await axios.get(`${base_url}get/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const readNotification = async (id:any) => {
  try {
    const result = await axios.put(`${base_url}read/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { getNotifications, readNotification }