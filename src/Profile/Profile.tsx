import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import Info from "./Info"
import { changeProfile } from "../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certification from "./Certification"
import { IconEdit } from "@tabler/icons-react"
import { useHover } from "@mantine/hooks"
import { successNotification } from "../Services/Notification"

const Profile = () => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const { hovered, ref } = useHover();

  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile picture updated successfully");
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/assets/profileBanner.jpg" alt="" />
        <div ref={ref} className="flex items-center justify-center -bottom-1/3 absolute left-3 ">
          <Avatar className="!w-48 !h-48 rounded-full  border-mine-shaft-950 border-8" src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/assets/avatar.png"} />
          {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
          {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
          <FileInput onChange={handleFileChange} className="absolute z-[301] w-full !h-full [&_*]:!h-full [&_*]:!rounded-full [&_*]:!text-transparent" variant="transparent" size="lg" radius={"xl"} accept="image/png,image/jpeg" />
        </div>
      </div>
      <Info />
      <Divider mx="xs" my="xl" />
      <About />
      <Divider mx="xs" my="xl" />
      <Skills />
      <Divider mx="xs" my="xl" />
      <Experience />
      <Divider mx="xs" my="xl" />
      <Certification />
    </div>
  )
}

export default Profile