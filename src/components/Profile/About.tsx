import { ActionIcon, Textarea } from '@mantine/core'
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { successNotification } from '../../services/notification'
import { updateProfile } from '../../services/profileService'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useMediaQuery } from '@mantine/hooks'

const About = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("")
  const matches = useMediaQuery('(max-width: 475px)');

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about)
    } else {
      setEdit(false);
    }
  }

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, about: about };
    dispatch(updateProfile(updatedProfile));
    successNotification("Success", "About updated successfully");
  }

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <div>
          {edit &&
            <ActionIcon color="green.8" size={matches ? "md" : "lg"} variant="subtle" onClick={handleSave}>
              <IconCheck className="w-4/5 h-4/5" />
            </ActionIcon>}
          <ActionIcon color={edit ? "red.8" : "brightSun.4"} size={matches ? "md" : "lg"} variant="subtle" onClick={handleClick}>
            {edit ? <IconX className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
      </div>
      {edit
        ? <Textarea autosize minRows={3} placeholder="Enter about yourself..." value={about} onChange={(event) => setAbout(event.currentTarget.value)} />
        : <div className="text-sm  text-mine-shaft-300 text-justify">{profile?.about}</div>}
    </div>
  )
}

export default About