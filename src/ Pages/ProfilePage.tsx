import { profile } from '../Data/TalentData'
import Profile from '../Profile/Profile'

const ProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Profile {...profile}/>
    </div>
  )
}

export default ProfilePage