import { Button } from '@mantine/core';
import { IconBowFilled } from '@tabler/icons-react';
import NavLinks from './NavLinks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../Services/ProfileService';
import { setProfile } from '../Slices/ProfileSlice';
import NotificationMenu from './NotificationMenu';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slices/UserSlice';
import { setupResponseInterceptor } from '../Interceptor/AxiosInterceptor';

const Header = () => {
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token == "") {
      const decoded = jwtDecode(localStorage.getItem('token') || "");
      dispatch(setUser({ ...decoded, email: decoded.sub }));
    }
    if (user) {
      getProfile(user?.profileId).then((data: any) => {
        dispatch(setProfile(data));
      }).catch((error: any) => console.log(error));
    }
  }, [token, navigate])

  return (
    location.pathname != "/sign-up" && location.pathname != "/login" &&
    <div className="w-full bg-mine-shaft-950 text-white h-28 flex px-6 justify-between items-center font-['poppins']">
      <div className='flex gap-1 items-center text-bright-sun-400'>
        <IconBowFilled stroke={1.25} className='w-8 h-8' />
        <div className='text-2xl font-semibold'>
          <Link to={"/"}>JobHook</Link>
        </div>
      </div>
      <NavLinks />
      <div className='flex gap-5 items-center'>
        {user ? <ProfileMenu /> : <Link to={"/login"}><Button variant='subtle' color='brightSun.4'>Login</Button></Link>}
        {/* <div className='bg-mine-shaft-900 rounded-full p-1.5'>
          <IconSettings stroke={1.5} />
        </div> */}
        {user ? <NotificationMenu /> : <></>}
      </div>
    </div>
  )
}

export default Header