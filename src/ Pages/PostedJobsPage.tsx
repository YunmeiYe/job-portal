import { useNavigate, useParams } from "react-router-dom"
import PostedJobDetails from "../components/PostedJobs/PostedJobDetails"
import PostedJob from "../components/PostedJobs/PostedJobs"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../services/jobService";

const PostedJobsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id).then((res) => {
      setJobList(res);
      if (res && res.length > 0 && Number(id) == 0) {
        navigate(`/posted-jobs/${res[0].id}`)
      }
      setJob(res.find((job: any) => job.id == id));
    }).catch((err) => {
      console.log(err);
    })
  }, [id]);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="flex justify-between gap-5">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDetails {...job} />
      </div>
    </div>
  )
}

export default PostedJobsPage