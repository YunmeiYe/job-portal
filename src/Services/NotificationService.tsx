import { agent } from '../api/agent';

const getNotifications = async (id: string | number): Promise<any> => await agent.Notification.getNotifications(id);

const readNotification = async (id: string | number): Promise<any> => await agent.Notification.readNotification(id);

export { getNotifications, readNotification }