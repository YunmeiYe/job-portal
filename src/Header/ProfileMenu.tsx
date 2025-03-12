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
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';
import { successNotification } from '../Services/Notification';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleLogout = () => {
    successNotification('You have been logged out', 'Redirecting to home page ...');
    setTimeout(() => {
      dispatch(removeUser());
      navigate("/");
    }, 4000)
  }

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className='flex items-center gap-2 cursor-pointer'>
          <div>{user.name}</div>
          <Avatar src={profile.picture?`data:image/jpeg;base64, ${profile.picture}`:"src/assets/avatar.png"} alt="it's me" />
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