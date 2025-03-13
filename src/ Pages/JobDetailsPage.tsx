import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useParams } from "react-router-dom"
import JobDetails from "../JobDetails/JobDetails"
import RecommendedJobs from "../JobDetails/RecommendedJobs"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      getJob(id).then((res) => {
        setJob(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [id])

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link to={"/find-jobs"} className="my-4 inline-block">
        <Button leftSection={<IconArrowLeft size={20} />} mb={'md'} color="brightSun.4" variant="light">Back</Button>
      </Link>
      <div className="flex gap-5 justify-around">
        <JobDetails {...job} />
        <RecommendedJobs />
      </div>
    </div>
  )
}

export default JobDetailsPage