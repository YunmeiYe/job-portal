import { useState } from "react";
import { fields } from "../../data/ProfileData"
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconPencil, IconBriefcase, IconMapPin, IconCheck, IconX } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import SelectInput from "./SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../services/notification";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { updateProfile } from "../../services/profileService";
import { useMediaQuery } from "@mantine/hooks";
const Info = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profile = useSelector((state: any) => state.profile);
  const { user } = useSelector((state: any) => state.auth);
  const matches = useMediaQuery('(max-width: 475px)');

  const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '', location: '', totalExp: 1 },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({ jobTitle: profile.jobTitle, company: profile.company, location: profile.location, totalExp: profile.totalExp });
    } else {
      setEdit(false);
    }
  }

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(updateProfile(updatedProfile));
    successNotification("Success", "Profile updated successfully");
  }

  return (
    <div className="px-3 mt-16">
      <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between">
        {user.name}
        <div>
          {edit && <ActionIcon color="green.8" size={matches ? "md" : "lg"} variant="subtle" onClick={handleSave}>
            <IconCheck className="w-4/5 h-4/5" />
          </ActionIcon>}
          <ActionIcon color={edit ? "red.8" : "brightSun.4"} size={matches ? "md" : "lg"} variant="subtle" onClick={handleClick}>
            {edit ? <IconX className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
          </ActionIcon>
        </div>
      </div>
      {edit ?
        <>
          <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:flex-wrap xs-mx:[&>*]:w-full">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:flex-wrap xs-mx:[&>*]:w-full">
            <SelectInput form={form} name="location" {...select[2]} />
            <NumberInput label={"Years of Experience"} {...form.getInputProps("totalExp")} withAsterisk clampBehavior="strict" min={1} max={70} />
          </div>
        </> :
        <>
          <div className="flex gap-1 text-xl xs-mx:text-base items-center"> <IconBriefcase className="w-5 h-5" stroke={1.5} />{profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="flex gap-1 text-lg xs-mx:text-base items-center text-mine-shaft-600 dark:text-mine-shaft-400">
            <IconMapPin className="w-5 h-5" stroke={1.5} /> {profile.location}
          </div>
          <div className="flex gap-1 text-lg xs-mx:text-base items-center text-mine-shaft-600 dark:text-mine-shaft-400">
            <IconBriefcase className="w-5 h-5" stroke={1.5} /> Experience: {profile.totalExp > 1 ? profile.totalExp + " Years" : 1 + " Year"}
          </div>
        </>
      }
    </div>
  )
}

export default Info