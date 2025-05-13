import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import TalentProfile from "../components/TalentProfile/TalentProfile"
import RecommendTalent from "../components/TalentProfile/RecommendedTalent"
import { useEffect, useState } from "react"
import { getAllProfiles } from "../services/profileService"
import { errorNotification } from "../services/notification"

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents] = useState([{}]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProfiles().then((res) => {
      setTalents(res);
    }).catch((err) => { errorNotification("Error", err.message); });
  }, []);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link to={"/find-talent"} className="my-4 inline-block">
        <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20} />} color="brightSun.4" my={"sm"} variant="light">Back</Button>
      </Link>
      <div className="flex gap-5 lg-mx:flex-wrap">
        <TalentProfile />
        <RecommendTalent talents={talents} />
      </div>
    </div>
  )
}

export default TalentProfilePage