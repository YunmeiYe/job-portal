import { Button, Divider } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertCard from "./CertCard"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProfile } from "../Services/ProfileService"

const TalentProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    getProfile(id).then((res) => {
      setProfile(res);
    }).catch((err) => { console.log(err) });
  })

  return (
    <div className="w-2/3">
      <div className="relative">
        <img className="rounded-t-2xl" src="/assets/profileBanner.jpg" alt="" />
        <img className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src={profile?.picture ? `data:image/jpeg;base64, ${profile?.picture}` : "/assets/avatar.png"} alt="" />
      </div>
      <div className="px-3 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {profile?.name}
          <Button color="brightSun.4" variant="outline">Message</Button>
        </div>
        <div className="flex gap-1 text-xl items-center"> <IconBriefcase className="w-5 h-5" stroke={1.5} />{profile?.jobTitle} &bull; {profile?.company}</div>
        <div className="flex gap-1 text-lg items-center text-mine-shaft-400">
          <IconMapPin className="w-5 h-5" stroke={1.5} /> {profile?.location}
        </div>
        <div className="flex gap-1 text-lg items-center text-mine-shaft-400">
          <IconBriefcase className="w-5 h-5" stroke={1.5} /> Experience: {profile.totalExp > 1 ? profile.totalExp + " Years" : 1 + " Year"}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">
          About
        </div>
        <div className="text-sm text-mine-shaft-300 text-justify">
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
            <div key={index} className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-sm font-medium text-bright-sun-400 px-3 py-1">
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