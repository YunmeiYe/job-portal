import { IconArrowLeft, IconBowFilled } from '@tabler/icons-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SignUp from '../components/SignUpLogin/SignUp'
import Login from '../components/SignUpLogin/Login'
import AccentButton from '../components/AccentButton'

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] overflow-hidden">
      <AccentButton size='sm' className='!absolute left-5 z-10' onClick={() => navigate("/")} my="md" leftSection={<IconArrowLeft size={20} />}variant="light">Home</AccentButton>
      <div className={`w-full h-[100vh] flex [&>*]:flex-shrink-0 transition-all ease-in-out duration-1000 ${location.pathname == '/sign-up' ? '-translate-x-1/2 sm-mx:-translate-x-full' : 'translate-x-0'}`}>
        <Login />
        <div className={`w-1/2 h-full sm-mx:hidden transition-all ease-in-out duration-1000 ${location.pathname == '/sign-up' ? 'rounded-r-[200px]' : 'rounded-l-[200px]'} bg-light-cream-50 dark:bg-mine-shaft-900 flex flex-col gap-5 items-center justify-center`}>
          <div className='flex gap-1 items-center text-primary'>
            <IconBowFilled stroke={1.25} className='w-16 h-16' />
            <div className='text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-semibold'>
              <Link to={"/"}>JobHook</Link>
            </div>
          </div>
          <div className='text-2xl bs-mx:text-xl md-mx:text-lg text-mine-shaft-800 dark:text-mine-shaft-200 font-semibold'>Find the job made for you</div>
        </div>
        <SignUp />
      </div>
    </div>
  )
}

export default SignUpPage