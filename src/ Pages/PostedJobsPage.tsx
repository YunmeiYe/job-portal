import PostedJobDetails from "../PostedJobs/PostedJobDetails"
import PostedJob from "../PostedJobs/PostedJobs"

const PostedJobsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
    <div className="flex justify-between gap-5">
        <PostedJob />
        <PostedJobDetails/>
    </div>
  </div>
  )
}

export default PostedJobsPage