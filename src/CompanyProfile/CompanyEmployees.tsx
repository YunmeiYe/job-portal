import { talents } from "../Data/TalentData"
import TalentCard from "../FindTalent/TalentCard"

const CompanyEmployees = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-10">
    {talents.map((talent, index) => 
        <TalentCard key={index} {...talent} />
      )}
    </div>
  )
}

export default CompanyEmployees