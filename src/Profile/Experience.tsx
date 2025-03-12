import { ActionIcon } from '@mantine/core'
import { IconPlus, IconPencil, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import ExpCard from './ExpCard'
import ExpInput from './ExpInput'
import { useSelector } from 'react-redux'

const Experience = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [addExp, setAddExp] = useState(false);

  const handleClick = () => {
      setEdit(!edit);
  }

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Experience
        <div className="flex gap-2">
          <ActionIcon color="brightSun.4" size={"lg"} variant="subtle" onClick={() => setAddExp(!addExp)}>
            <IconPlus className="w-4/5 h-4/5" />
          </ActionIcon>
          <ActionIcon color={edit ? "red.8" : "brightSun.4"} size={"lg"} variant="subtle" onClick={handleClick}>
            {edit ? <IconX className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {profile?.experiences?.map((exp: any, index: number) =>
          <ExpCard key={index} index={index} {...exp} edit={edit} />
        )}
        {addExp && <ExpInput setEdit={setAddExp} add />}
      </div>
    </div>
  )
}

export default Experience