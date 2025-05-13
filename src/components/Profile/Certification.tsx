import { ActionIcon } from '@mantine/core'
import { IconPlus, IconPencil, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import CertCard from './CertCard'
import CertInput from './CertInput'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@mantine/hooks'

const Certification = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [addCert, setAddCert] = useState(false);
  const matches = useMediaQuery('(max-width: 475px)');

  const handleClick = () => {
    setEdit(!edit);
  }

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Certifications
        <div className="flex gap-2">
          <ActionIcon color="brightSun.4" size={matches ? "md" : "lg"} variant="subtle" onClick={() => setAddCert(!addCert)}>
            <IconPlus className="w-4/5 h-4/5" />
          </ActionIcon>
          <ActionIcon color={edit ? "red.8" : "brightSun.4"} size={matches ? "md" : "lg"} variant="subtle" onClick={handleClick}>
            {edit ? <IconX className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {profile?.certifications?.map((cert: any, index: number) =>
          <CertCard key={index} index={index} {...cert} edit={edit} />
        )}
        {
          addCert && <CertInput setEdit={setAddCert} />
        }
      </div>
    </div>
  )
}

export default Certification