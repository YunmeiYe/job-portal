import Sort from "../FindJobs/Sort"
import TalentCard from "./TalentCard"
import { talents } from "../Data/TalentData"
import { useState, useEffect } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const Talents = () => {
  const [talents, setTalents] = useState([{}]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProfiles().then((res) => {
      setTalents(res);
    }).catch((err)=>{console.log(err);});
  }, []);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <div>
          <Sort />
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-between">
        {talents.map((talent, index) =>
          <TalentCard key={index} {...talent} />
        )}
      </div>
    </div>
  )
}

export default Talents