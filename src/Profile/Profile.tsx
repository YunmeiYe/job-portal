import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core"
import { IconDeviceFloppy, IconPencil, IconPlus } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertCard from "./CertCard"
import { useEffect, useState } from "react"
import ExpInput from "./ExpInput"
import CertInput from "./CertInput"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../Services/ProfileService"
import Info from "./Info"
import { setProfile } from "../Slices/ProfileSlice"

const Profile = (props: any) => {
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState(props.skills);
  const [edit, setEdit] = useState([false, false, false, false]);
  const [addExp, setAddExp] = useState(false);
  const [addCert, setAddCert] = useState(false);
  const [about, setAbout] = useState(props.about);

  useEffect(() => {
    console.log(profile);
    getProfile(user.id).then((data: any) => {
      console.log(data);
      dispatch(setProfile(data));
    }).catch((error: any) => console.log(error));
  }, [])

  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="src/assets/profileBanner.jpg" alt="" />
        <img className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="src/assets/avatar.png" alt="" />
      </div>
      <Info/>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About
          <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => handleEdit(1)}>
            {edit[1] ? <IconDeviceFloppy className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
        {edit[1]
          ? <Textarea autosize minRows={3} placeholder="Enter about yourself..." value={about} onChange={(event) => setAbout(event.currentTarget.value)} />
          : <div className="text-sm text-mine-shaft-300 text-justify">{profile.about}</div>}
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills
          <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => handleEdit(2)}>
            {edit[2] ? <IconDeviceFloppy className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
        {edit[2]
          ?
          <TagsInput placeholder="Enter skill" splitChars={[',', ' ', '|']} value={skills} onChange={setSkills} />
          : <div className="flex flex-wrap gap-2">
            {profile?.skills?.map((skill: any, index: number) =>
              <div key={index} className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-sm font-medium text-bright-sun-400 px-3 py-1">
                {skill}
              </div>
            )}
          </div>
        }
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience
          <div className="flex gap-2">
            <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => setAddExp(!addExp)}>
              <IconPlus className="w-4/5 h-4/5" />
            </ActionIcon>
            <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => handleEdit(3)}>
              {edit[3] ? <IconDeviceFloppy className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: number) =>
            <ExpCard key={index} {...exp} edit={edit[3]} />
          )}
          {addExp && <ExpInput setEdit={setAddExp} add />}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications
          <div className="flex gap-2">
            <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => setAddCert(!addCert)}>
              <IconPlus className="w-4/5 h-4/5" />
            </ActionIcon>
            <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => handleEdit(4)}>
              {edit[4] ? <IconDeviceFloppy className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((cert: any, index: number) =>
            <CertCard key={index} {...cert} edit={edit[4]} />
          )}
          {
            addCert && <CertInput setEdit={setAddCert} />
          }
        </div>
      </div>
    </div>
  )
}

export default Profile