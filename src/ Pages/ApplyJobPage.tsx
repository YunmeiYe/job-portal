import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ApplyJobComp from "../ApplyJob/ApplyJobComp"
import { useState, useEffect } from "react"
import { getJob } from "../Services/JobService"

const ApplyJobPage = () => {
  const navigate = useNavigate();
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
      <Link to={"/job-details"} className="my-4 inline-block">
        <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20} />} mb={'md'} color="brightSun.4" variant="light">Back</Button>
      </Link>
      <ApplyJobComp {...job} />
    </div>
  )
}

export default ApplyJobPage