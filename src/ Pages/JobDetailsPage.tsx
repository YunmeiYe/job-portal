import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import JobDetails from "../JobDetails/JobDetails"
import RecommendedJobs from "../JobDetails/RecommendedJobs"

const JobDetailsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link to={"/find-jobs"} className="my-4 inline-block">
        <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light">Back</Button>
      </Link>
      <div className="flex gap-5 justify-around">
        <JobDetails />
        <RecommendedJobs />
      </div>
    </div>
  )
}

export default JobDetailsPage