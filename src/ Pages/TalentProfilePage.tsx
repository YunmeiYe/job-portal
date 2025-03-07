import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import TalentProfile from "../TalentProfile/TalentProfile"
import { profile } from "../Data/TalentData"
import RecommendTalent from "../TalentProfile/RecommendedTalent"

const TalentProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link to={"/find-talent"} className="my-4 inline-block">
        <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light">Back</Button>
      </Link>
      <div className="flex gap-5">
        <TalentProfile {...profile} />
        <RecommendTalent />
      </div>
    </div>
  )
}

export default TalentProfilePage