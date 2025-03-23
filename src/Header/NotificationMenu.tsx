import { Menu, Indicator, Notification } from '@mantine/core'
import { IconBell, IconCheck } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { readNotification } from '../Services/NotificationService'
import { useNavigate } from 'react-router-dom'
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const NotificationMenu = () => {
  const user = useSelector((state: any) => state.user);
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        client.subscribe(`/user/${user.id}/notifications`, (message) => {
          if (message.body) {
            setNotifications((prev) => [...prev, JSON.parse(message.body)]);
          }
        });

        // Request unread notifications when WebSocket reconnects
        client.publish({
          destination: "/app/reconnect",
          body: JSON.stringify(user.id),
        });
      },
    });
    client.activate();
    return () => {
      client.deactivate();
    };
  }, [user.id]);

  const markAsRead = (index: number) => {
    let updatedNotifications = [...notifications];
    updatedNotifications = updatedNotifications.filter((_, i: number) => i != index);
    setNotifications(updatedNotifications);
    readNotification(notifications[index].id).then((res) => console.log(res)).catch((err) => console.log(err));
    console.log(updatedNotifications);
  }

  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className='bg-mine-shaft-900 rounded-full p-1.5 cursor-pointer'>
          <Indicator color="brightSun.4" size={8} offset={7} processing disabled={notifications.length <= 0}>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>
      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className='flex flex-col gap-1'>
          {notifications.map((noti: any, index: number) =>
            <Notification key={index} className='hover:bg-mine-shaft-900 cursor-pointer' icon={<IconCheck size={20} />} color="teal" title={noti.action} onClose={() => markAsRead(index)} onClick={() => { navigate(noti.route); markAsRead(index); setOpened(false) }}>
              {noti.message}
            </Notification>
          )}
          {notifications.length == 0 && <div className='text-center text-mine-shaft-300'>No Notifications</div>}
        </div>
      </Menu.Dropdown>
    </Menu>
  )
}

export default NotificationMenu