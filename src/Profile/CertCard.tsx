import { ActionIcon } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { formatDate } from "../Services/Utilities"
import { successNotification } from "../Services/Notification"
import { changeProfile } from "../Slices/ProfileSlice"
import { useDispatch, useSelector } from "react-redux"

const CertCard = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleDelete = () => {
    let certs = [...profile.certifications];
    certs.splice(props.index, 1);
    let updatedProfile = { ...profile, certifications: certs };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate deleted successfully");
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img className="h-7" src={`/assets/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">{props.name}</div>
          <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end text-sm text-mine-shaft-300">
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