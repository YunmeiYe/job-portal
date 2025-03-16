import JobCard from "./JobCard"
import Sort from "./Sort"
import { useEffect, useState } from "react"
import { getAllJobs } from "../Services/JobService"
import { useDispatch, useSelector } from "react-redux"
import { resetFilter } from "../Slices/FilterSlice"

const Jobs = () => {
  const [jobList, setJobList] = useState([{}]);
  const [filteredJobs, setFilteredJobs] = useState([{}]);
  const filter = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetFilter());
    getAllJobs().then((res) => {
      setJobList(res);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    let filteredJobs = jobList;
    setFilteredJobs(jobList);
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filteredJobs = filteredJobs.filter((job: any) => filter["Job Title"].some((title: any) => job.jobTitle?.toLowerCase().includes(title.toLowerCase())));
    };
    if (filter.Location && filter.Location.length > 0) {
      filteredJobs = filteredJobs.filter((job:any) => filter.Location.some((location: any) => job.location?.toLowerCase().includes(location.toLowerCase())));
    };
    if (filter.Experience && filter.Experience.length > 0) {
      filteredJobs = filteredJobs.filter((job:any) => filter.Experience.some((exp: any) => job.experience?.toLowerCase().includes(exp.toLowerCase())));
    };
    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filteredJobs = filteredJobs.filter((job:any) => filter["Job Type"].some((jobType: any) => job.jobType?.toLowerCase().includes(jobType.toLowerCase())));
    };
    if (filter.salary && filter.salary.length > 0) {
      filteredJobs = filteredJobs.filter((job:any) => job.packageOffered >= filter.salary[0] && job.packageOffered <= filter.salary[1]);
    };
    setFilteredJobs(filteredJobs);
  }, [filter, jobList]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <div>
          <Sort />
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-5">
        {filteredJobs.length
          ? filteredJobs.map((job, index) =>
            <JobCard key={index} {...job} />)
          : <div className="text-xl font-semibold">No Jobs Found</div>
        }
      </div>
    </div>
  )
}

export default Jobs