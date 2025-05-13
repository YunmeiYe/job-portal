import { useParams } from "react-router-dom"
import TalentCard from "../FindTalent/TalentCard"

const RecommendedTalent = (props: any) => {
  const { id } = useParams();

  return (
    <div className="mt-10">
      <div className="text-xl font-semibold mb-5">
        Recommended Talent
      </div>
      <div className="flex flex-col lg-mx:flex-wrap lg-mx:flex-row gap-5 justify-between">
        {props?.talents?.map((talent: any, index: number) => index < 4 && id != talent.id &&
          <TalentCard key={index} {...talent} />
        )}
      </div>
    </div>
  )
}

export default RecommendedTalent