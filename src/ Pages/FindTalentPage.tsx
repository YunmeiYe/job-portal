import { Divider } from "@mantine/core"
import SearchBar from "../components/FindTalent/SearchBar"
import Talents from "../components/FindTalent/Talents"

const FindTalentPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Talents />
    </div>
  )
}

export default FindTalentPage