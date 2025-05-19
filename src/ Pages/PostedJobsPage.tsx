import { useNavigate, useParams } from "react-router-dom"
import PostedJobDetails from "../components/PostedJobs/PostedJobDetails"
import PostedJobs from "../components/PostedJobs/PostedJobs"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../services/jobService";
import { errorNotification } from "../services/notification";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobsPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState({});
  const matches = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id).then((res) => {
      setJobList(res);
      if (res && res.length > 0 && Number(id) == 0) {
        navigate(`/posted-jobs/${res[0].id}`)
      }
      setJob(res.find((job: any) => job.id == id));
    }).catch((err) => {
      errorNotification("Error", err.message);
    })
  }, [id]);

  return (
    <div className="min-h-[100vh] px-5">
      {matches && <Button my="xs" size="sm" autoContrast onClick={open}>All Jobs</Button>}
      <Drawer opened={opened} onClose={close} title="All Jobs" size={230}>
        <PostedJobs job={job} jobList={jobList} onClose={close} />
      </Drawer>
      <div className="flex justify-between gap-5">
        {!matches && <PostedJobs job={job} jobList={jobList} />}
        <PostedJobDetails {...job} />
      </div>
    </div>
  )
}

export default PostedJobsPage