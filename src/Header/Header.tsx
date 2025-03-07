import { Indicator } from '@mantine/core';
import { IconBell, IconBowFilled, IconSettings } from '@tabler/icons-react';
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const location = useLocation();

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
        <ProfileMenu />
        <div className='bg-mine-shaft-900 rounded-full p-1.5'>
          <IconSettings stroke={1.5} />
        </div>
        <div className='bg-mine-shaft-900 rounded-full p-1.5'>
          <Indicator color="brightSun.4" size={8} offset={7} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  )
}

export default Header