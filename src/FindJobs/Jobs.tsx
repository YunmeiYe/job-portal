import JobCard from "./JobCard"
import Sort from "./Sort"
import { useEffect, useState } from "react"
import { getAllJobs } from "../Services/JobService"
import { errorNotification } from "../Services/Notification"

const Jobs = () => {
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
    }).catch((err) => {
      errorNotification("Error", err.response.data.errorMessage)
    })
  }, [])

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <div>
          <Sort />
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-between">
        {jobList.map((job, index) =>
          <JobCard key={index} {...job} />
        )}
      </div>
    </div>
  )
}

export default Jobs