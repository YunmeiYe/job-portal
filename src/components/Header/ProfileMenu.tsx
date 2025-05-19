import { Menu, Avatar } from '@mantine/core';
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconLogout2,
  IconHeart,
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
          <div className='xs-mx:hidden'>{user.name}</div>
          <Avatar src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/assets/avatar.png"} alt="it's me" />
        </div>
      </Menu.Target>
      <Menu.Dropdown onChange={() => setOpened(true)} >
        <Link to={'/profile'}><Menu.Item className='hover:text-primary' leftSection={<IconUserCircle size={14} />}>Profile</Menu.Item></Link>
        <Menu.Item className='hover:text-primary' leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item className='hover:text-primary' leftSection={<IconFileText size={14} />}>Resume</Menu.Item>
        <Menu.Item className='hover:text-primary' leftSection={<IconHeart size={14} />}>Collection</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleLogout} color="red" leftSection={<IconLogout2 size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu