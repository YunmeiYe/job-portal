import { Divider } from "@mantine/core"
import SearchBar from "../components/FindJobs/SearchBar"
import Jobs from "../components/FindJobs/Jobs"

const FindJobsPage = () => {
  return (
    <div className="min-h-[100vh]">
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Jobs />
    </div>
  )
}

export default FindJobsPage