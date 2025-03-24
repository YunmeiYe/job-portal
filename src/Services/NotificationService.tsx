import axiosInstance from '../Interceptor/AxiosInterceptor';

const getNotifications = async (id:any) => {
  try {
    const result = await axiosInstance.get(`notifications/get/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

const readNotification = async (id:any) => {
  try {
    const result = await axiosInstance.put(`/notifications/read/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export { getNotifications, readNotification }