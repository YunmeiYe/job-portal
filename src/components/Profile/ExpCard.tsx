import { Button } from "@mantine/core"
import { useState } from "react"
import ExpInput from "./ExpInput";
import { formatDate } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../services/notification";
import { updateProfile } from "../../services/profileService";
import { ThunkDispatch } from "@reduxjs/toolkit";
import AccentButton from "../AccentButton";

const ExpCard = (props: any) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.index, 1);
    let updatedProfile = { ...profile, experiences: exp };
    dispatch(updateProfile(updatedProfile));
    successNotification("Success", "Experience deleted successfully");
  }

  return (
    !edit ?
      <div className="flex flex-col gap-2">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <div className="p-2 bg-light-cream-300 dark:bg-mine-shaft-800 rounded-md">
              <img className="h-7" src={`/assets/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">{props.title}</div>
              <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300">{props.company} &bull; {props.location}</div>
            </div>
          </div>
          <div className="text-sm text-mine-shaft-500">
            {formatDate(props.startDate)} - {props.working ? "Present" : formatDate(props.endDate)}
          </div>
        </div>
        <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300 text-justify">
          {props.description}
        </div>
        {props.edit &&
          <div className="flex gap-5">
            <AccentButton onClick={() => setEdit(true)} variant="outline">Edit</AccentButton>
            <Button onClick={handleDelete} color="red.8" variant="light">Delete</Button>
          </div>
        }
      </div>
      : <ExpInput setEdit={setEdit} {...props} />
  )
}

export default ExpCard