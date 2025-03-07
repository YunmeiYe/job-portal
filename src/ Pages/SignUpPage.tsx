import { IconBowFilled } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import SignUp from '../SignUpLogin/SignUp'
import Login from '../SignUpLogin/Login'

const SignUpPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden">
      <div className={`w-full h-[100vh] flex [&>*]:flex-shrink-0 transition-all ease-in-out duration-1000 ${location.pathname == '/sign-up' ? '-translate-x-1/2' : 'translate-x-0'}`}>
        <Login />
        <div className={`w-1/2 h-full transition-all ease-in-out duration-1000 ${location.pathname == '/sign-up' ? 'rounded-r-[200px]' : 'rounded-l-[200px]'} bg-mine-shaft-900 flex flex-col gap-5 items-center justify-center`}>
          <div className='flex gap-1 items-center text-bright-sun-400'>
            <IconBowFilled stroke={1.25} className='w-16 h-16' />
            <div className='text-6xl font-semibold'>
              <Link to={"/"}>JobHook</Link>
            </div>
          </div>
          <div className='text-2xl text-mine-shaft-200'>Find the job made for you</div>
        </div>
        <SignUp />
      </div>
    </div>
  )
}

export default SignUpPage