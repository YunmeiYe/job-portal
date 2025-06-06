import { Link, useParams } from "react-router-dom"
import { timeAgo } from "../../utils/common";

const PostedJobCard = (props: any) => {
  const { id } = useParams();

  return (
    <Link to={`/posted-jobs/${props.id}`} className={`w-52 lg-mx:w-48 bs-mx:w-44 rounded-xl p-2 border-l-2 hover:bg-opacity-80 cursor-pointer border-l-bright-sun-400 ${props.id == id ? "bg-primary text-mine-shaft-900" : "bg-light-cream-50 dark:bg-mine-shaft-900 text-mine-shaft-500 dark:text-mine-shaft-300"}`}>
      <div className="text-sm font-semibold">{props.jobTitle}</div>
      <div className="text-xs font-medium">{props.location}</div>
      <div className="text-xs">{props.jobStatus == "DRAFT" ? "Drafted" : props.jobStatus == "CLOSED" ? "Closed" : "Posted"} {timeAgo(props.postTime)}</div>
    </Link>
  )
}

export default PostedJobCard