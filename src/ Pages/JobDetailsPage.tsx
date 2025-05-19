import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import JobDetails from "../components/JobDetails/JobDetails"
import RecommendedJobs from "../components/JobDetails/RecommendedJobs"
import { useEffect, useState } from "react"
import { getJob } from "../services/jobService"
import { errorNotification } from "../services/notification"
import AccentButton from "../components/AccentButton"

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      getJob(id).then((res) => {
        setJob(res);
      }).catch((err) => {
        errorNotification("Error", err.message);
      })
    }
  }, [id])

  return (
    <div className="min-h-[100vh] p-4">
      <Link to={"/find-jobs"} className="my-4 inline-block w-full">
        <AccentButton onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20} />} mb={'md'} variant="light">Back</AccentButton>
      </Link>
      <div className="flex gap-5 justify-around bs-mx:flex-wrap">
        <JobDetails {...job} />
        <RecommendedJobs />
      </div>
    </div>
  )
}

export default JobDetailsPage