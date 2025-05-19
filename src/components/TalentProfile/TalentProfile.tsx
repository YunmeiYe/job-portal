import { Avatar, Button, Divider } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertCard from "./CertCard"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProfile } from "../../services/profileService"
import { errorNotification } from "../../services/notification"
import { useMediaQuery } from "@mantine/hooks"
import AccentButton from "../AccentButton"

const TalentProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});
  const matches = useMediaQuery('(max-width: 475px)');

  useEffect(() => {
    if (id) {
      getProfile(id).then((res) => {
        setProfile(res);
      }).catch((err) => { errorNotification("Error", err.message); });
    }
  }, [id]);

  return (
    <div className="w-2/3 lg-mx:w-full">
      <div className="relative">
        <img className="rounded-t-2xl w-full xl-mx:h-40 xs-mx:h-32" src="/assets/profileBanner.jpg" alt="" />
        <div className="flex items-center justify-center -bottom-1/3 md-mx:-bottom-10 sm-mx:-bottom-16 absolute left-6">
          <Avatar className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 rounded-full border-light-cream-100 dark:border-mine-shaft-950 border-8" src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/assets/avatar.png"} />
        </div>
      </div>
      <div className="px-3 mt-16">
        <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between">
          {profile?.name}
          <AccentButton size={matches ? "sm" : "md"} variant="outline">Message</AccentButton>
        </div>
        <div className="flex gap-1 text-xl xs-mx:text-base items-center"> <IconBriefcase className="w-5 h-5" stroke={1.5} />{profile?.jobTitle} &bull; {profile?.company}</div>
        <div className="flex gap-1 text-lg xs-mx:text-base items-center text-mine-shaft-600 dark:text-mine-shaft-400">
          <IconMapPin className="w-5 h-5" stroke={1.5} /> {profile?.location}
        </div>
        <div className="flex gap-1 text-lg xs-mx:text-base items-center text-mine-shaft-600 dark:text-mine-shaft-400">
          <IconBriefcase className="w-5 h-5" stroke={1.5} /> Experience: {profile.totalExp > 1 ? profile.totalExp + " Years" : 1 + " Year"}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">
          About
        </div>
        <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">
          Skills
        </div>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: any) =>
            <div key={index} className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-sm font-medium text-primary px-3 py-1">
              {skill}
            </div>
          )}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">
          Experience
        </div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: any) =>
            <ExpCard key={index} {...exp} />
          )}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">
          Certifications
        </div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((cert: any, index: any) =>
            <CertCard key={index} {...cert} />
          )}
        </div>
      </div>
    </div>
  )
}

export default TalentProfile