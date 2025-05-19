import { ActionIcon, Burger, Drawer, useMantineColorScheme } from '@mantine/core';
import { IconBowFilled, IconMoonStars, IconSun, IconX } from '@tabler/icons-react';
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProfile } from '../../services/profileService';
import { setProfile } from '../../store/profileSlice';
import NotificationMenu from './NotificationMenu';
import { errorNotification } from '../../services/notification';
import { useDisclosure } from '@mantine/hooks';
import AccentButton from '../AccentButton';

const links = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Find Talent", url: "/find-talent" },
  { name: "Post Job", url: "/post-job/0" },
  { name: "Posted Jobs", url: "/posted-jobs/0" },
  { name: "Job History", url: "/job-history" },
]

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (user?.profileId) {
      getProfile(user.profileId)
        .then((data: any) => { dispatch(setProfile(data)); })
        .catch((error: any) => errorNotification("Error", error.message));
    }
  }, [user?.profileId, dispatch])

  if (location.pathname === "/sign-up" || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="w-full h-28 flex px-6 justify-between items-center font-['poppins']">
      <div className='flex gap-1 items-center text-primary'>
        <IconBowFilled stroke={1.25} className='w-8 h-8' />
        <div className='xs-mx:hidden text-2xl font-semibold'>
          <Link to={"/"}>JobHook</Link>
        </div>
      </div>
      <NavLinks />
      <div className='flex gap-5 items-center'>
        {user ? (
          <>
            <ProfileMenu />
            <NotificationMenu />

          </>
        ) : (
          <Link to="/login">
            <AccentButton variant="subtle">
              Login
            </AccentButton>
          </Link>
        )}
        <ActionIcon size="lg" radius="xl" className='hover:!bg-bright-sun-400 dark:hover:!bg-bright-sun-500' autoContrast onClick={() => { toggleColorScheme(); setChecked((prev) => !prev) }}>{checked ? <IconMoonStars /> : <IconSun color='white' />}</ActionIcon>

        <Burger className='bs:hidden' opened={opened} onClick={open} aria-label="Toggle navigation" />

        <Drawer opened={opened} onClose={close} position='right' size="xs" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} closeButtonProps={{
          icon: <IconX size={30} stroke={1.5} />,
        }} >
          <div className='flex flex-col gap-6 items-center'>
            {links.map((link, index) =>
              <div key={index} className={`h-full flex items-center`}>
                <Link to={link.url} className='hover:text-primary text-xl'>{link.name}</Link>
              </div>)}</div>
        </Drawer>
      </div>
    </div>
  )
}

export default Header