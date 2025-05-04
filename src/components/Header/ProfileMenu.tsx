import { Menu, Avatar, Switch } from '@mantine/core';
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { errorNotification, successNotification } from '../../services/notification';
import { logoutUser } from '../../services/authService';
import { ThunkDispatch } from '@reduxjs/toolkit';

const ProfileMenu = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: any) => state.auth);
  const profile = useSelector((state: any) => state.profile);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).unwrap().then(() => {
      successNotification('You have been logged out', location.pathname !== '/' ? 'Redirecting to home page ...' : '');
      setTimeout(() => {
        navigate("/");
      }, 2000)
    }).catch((err) => {
      errorNotification("Logout Failed", err.message);
    });
  }

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div>{user.name}</div>
          <Avatar src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/assets/avatar.png"} alt="it's me" />
        </div>
      </Menu.Target>
      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Link to={'/profile'}><Menu.Item leftSection={<IconUserCircle size={14} />}>Profile</Menu.Item></Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>
        <Menu.Item leftSection={<IconMoon size={14} />} rightSection={
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            size="md"
            color="dark.4"
            onLabel={<IconSun size={16} stroke={2.5} color="yellow" />}
            offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
          />
        }
        >
          Dark Mode
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleLogout} color="red" leftSection={<IconLogout2 size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu