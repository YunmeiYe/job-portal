import { ActionIcon } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { formatDate } from "../../utils/common"
import { successNotification } from "../../services/notification"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../../services/profileService"
import { ThunkDispatch } from "@reduxjs/toolkit"

const CertCard = (props: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let certs = [...profile.certifications];
    certs.splice(props.index, 1);
    let updatedProfile = { ...profile, certifications: certs };
    dispatch(updateProfile(updatedProfile));
    successNotification("Success", "Certificate deleted successfully");
  }

  return (
    <div className="flex sm-mx:flex-wrap justify-between gap-2">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-light-cream-300 dark:bg-mine-shaft-800 rounded-md shrink-0">
          <img className="h-7" src={`/assets/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold xs-mx:text-sm">{props.name}</div>
          <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col sm-mx:flex-row sm-mx:gap-3 items-end text-sm xs-mx:text-sm text-mine-shaft-500">
          <div>Issued: {formatDate(props.issueDate)}</div>
          <div>ID: {props.certificateId}</div>
        </div>
        {props.edit &&
          <ActionIcon color="red.8" size={"lg"} variant="subtle" >
            <IconTrash onClick={handleDelete} className="w-4/5 h-4/5" stroke={1.5} />
          </ActionIcon>
        }
      </div>
    </div>

  )
}

export default CertCard