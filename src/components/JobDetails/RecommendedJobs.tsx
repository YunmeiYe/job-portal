import { useParams } from "react-router-dom"
import JobCard from "../FindJobs/JobCard"
import { useState, useEffect } from "react";
import { getAllJobs } from "../../services/jobService";
import { errorNotification } from "../../services/notification";

const RecommendedJobs = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState([{}]);

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
    }).catch((err) => {
      errorNotification("Error", err.message)
    })
  }, [])

  return (
    <div>
      <div className="text-xl font-semibold mb-5">
        Recommended Jobs
      </div>
      <div className="flex flex-wrap bs:flex-col bs-mx:justify-start gap-5 justify-between">
        {jobList?.map((job: any, index: any) => index < 6 && id != job.id &&
          <JobCard key={index} {...job} />
        )}
      </div>
    </div>
  )
}

export default RecommendedJobs