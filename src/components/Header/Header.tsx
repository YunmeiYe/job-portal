import { Button } from '@mantine/core';
import { IconBowFilled } from '@tabler/icons-react';
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../../services/profileService';
import { setProfile } from '../../store/profileSlice';
import NotificationMenu from './NotificationMenu';
import { errorNotification } from '../../services/notification';

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

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
    <div className="w-full bg-mine-shaft-950 text-white h-28 flex px-6 justify-between items-center font-['poppins']">
      <div className='flex gap-1 items-center text-bright-sun-400'>
        <IconBowFilled stroke={1.25} className='w-8 h-8' />
        <div className='text-2xl font-semibold'>
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
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header