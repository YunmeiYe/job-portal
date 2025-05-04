import { ActionIcon, TagsInput } from '@mantine/core'
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { successNotification } from '../../services/notification'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { updateProfile } from '../../services/profileService'

const Skills = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profile = useSelector((state: any) => state.profile);
  const [skills, setSkills] = useState<string[]>([]);

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills)
    } else {
      setEdit(false);
    }
  }

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, skills: skills };
    dispatch(updateProfile(updatedProfile));
    successNotification("Success", "Skills updated successfully");
  }
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills
        <div>
          {edit &&
            <ActionIcon color="green.8" size={"lg"} variant="subtle" onClick={handleSave}>
              <IconCheck className="w-4/5 h-4/5" />
            </ActionIcon>}
          <ActionIcon color={edit ? "red.8" : "brightSun.4"} size={"lg"} variant="subtle" onClick={handleClick}>
            {edit ? <IconX className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
      </div>
      {edit
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
  )
}

export default Skills