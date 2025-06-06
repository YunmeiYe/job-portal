import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import Info from "./Info"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certification from "./Certification"
import { IconEdit } from "@tabler/icons-react"
import { useHover } from "@mantine/hooks"
import { successNotification } from "../../services/notification"
import { getBase64 } from "../../utils/common"
import { updateProfile } from "../../services/profileService"
import { ThunkDispatch } from "@reduxjs/toolkit"

const Profile = () => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { hovered, ref } = useHover();

  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(updateProfile(updatedProfile));
    successNotification("Success", "Profile picture updated successfully");
  }

  return (
    <div className="w-4/5 lg-mx:w-full mx-auto">
      <div>
        <div className="relative px-5">
          <img className="rounded-t-2xl w-full lg-mx:h-40 xs-mx:h-32" src="/assets/profileBanner.jpg" alt="" />
          <div ref={ref} className="flex items-center justify-center -bottom-[25%] xs-mx:-bottom-10 absolute left-8">
            <Avatar className="!w-48 !h-48 lg-mx:!w-40 lg-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 rounded-full border-light-cream-300 dark:border-mine-shaft-950 border-8" src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/assets/avatar.png"} />
            {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
            {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
            {hovered && <FileInput onChange={handleFileChange} className="absolute z-[301] w-full !h-full [&_*]:!h-full [&_*]:!rounded-full [&_*]:!text-transparent" variant="transparent" size="lg" radius={"xl"} accept="image/png,image/jpeg" />}
          </div>
        </div>
        <Info {...profile} />
        <Divider mx="xs" my="xl" />
        <About />
        <Divider mx="xs" my="xl" />
        <Skills />
        <Divider mx="xs" my="xl" />
        <Experience />
        <Divider mx="xs" my="xl" />
        <Certification />
      </div>
    </div>
  )
}

export default Profile