import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core"
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertCard from "./CertCard"
import { useState } from "react"
import SelectInput from "./SelectInput"
import { fields } from "../Data/ProfileData"
import ExpInput from "./ExpInput"
import CertInput from "./CertInput"

const Profile = (props: any) => {
  const select = fields;
  const [skills, setSkills] = useState(props.skills);
  const [edit, setEdit] = useState([false, false, false, false]);
  const [addExp, setAddExp] = useState(false);
  const [addCert, setAddCert] = useState(false);
  const [about, setAbout] = useState(props.about);

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
      <div className="px-3 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {props.name}
          <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => handleEdit(0)}>
            {edit[0] ? <IconDeviceFloppy className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
        {edit[0] ?
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
          </> :
          <>
            <div className="flex gap-1 text-xl items-center"> <IconBriefcase className="w-5 h-5" stroke={1.5} />{props.role} &bull; {props.company}</div>
            <div className="flex gap-1 text-lg items-center text-mine-shaft-400">
              <IconMapPin className="w-5 h-5" stroke={1.5} /> {props.location}
            </div>
          </>
        }
      </div>
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
          : <div className="text-sm text-mine-shaft-300 text-justify">{about}</div>}
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
            {skills.map((skill: any, index: any) =>
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
          {props.experience.map((exp: any, index: any) =>
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
          {props.certifications.map((cert: any, index: any) =>
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