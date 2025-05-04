import Sort from "../FindJobs/Sort"
import TalentCard from "./TalentCard"
import { useState, useEffect } from "react";
import { getAllProfiles } from "../../services/profileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../store/filterSlice";
import { resetSort } from "../../store/sortSlice";
import { errorNotification } from "../../services/notification";

const Talents = () => {
  const [talents, setTalents] = useState<any[]>([{}]);
  const [filteredTalents, setFilteredTalents] = useState([{}]);
  const sort = useSelector((state: any) => state.sort);
  const filter = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetFilter());
    dispatch(resetSort());
    getAllProfiles().then((res) => {
      setTalents(res);
    }).catch((err) => { errorNotification("Error", err.message); });
  }, []);

  useEffect(() => {
    if (sort == "Experience (Low to High)") {
      setTalents([...talents].sort((a: any, b: any) => a.totalExp - b.totalExp));
    };
    if (sort == "Experience (High to Low)") {
      setTalents([...talents].sort((a: any, b: any) => b.totalExp - a.totalExp));
    };
  }, [sort]);

  useEffect(() => {
    let filteredTalents = talents;
    setFilteredTalents(talents);
    if (filter.name) {
      filteredTalents = filteredTalents.filter((talent) => talent.name?.toLowerCase().includes(filter.name.toLowerCase()))
    };
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filteredTalents = filteredTalents.filter((talent) => filter["Job Title"].some((title: any) => talent.jobTitle?.toLowerCase().includes(title.toLowerCase())));
    };
    if (filter.Location && filter.Location.length > 0) {
      filteredTalents = filteredTalents.filter((talent) => filter.Location.some((location: any) => talent.location?.toLowerCase().includes(location.toLowerCase())));
    };
    if (filter.skills && filter.skills.length > 0) {
      filteredTalents = filteredTalents.filter((talent) => filter.skills.some((skill: any) => talent.skills?.some((talentSkill: any) => talentSkill.toLowerCase().includes(skill.toLowerCase()))));
    };
    if (filter.exp && filter.exp.length > 0) {
      filteredTalents = filteredTalents.filter((talent) => talent.totalExp >= filter.exp[0] && talent.totalExp <= filter.exp[1]);
    };
    setFilteredTalents(filteredTalents);
  }, [filter, talents]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <div>
          <Sort sort="talent" />
        </div>
      </div>
      <div className={`mt-10 flex flex-wrap gap-5 ${filteredTalents?.length > 2 ? "justify-between" : ""} `}>
        {filteredTalents.length
          ? filteredTalents.map((talent, index) =>
            <TalentCard key={index} {...talent} />)
          : <div className="text-xl font-semibold">No Talents Found</div>
        }
      </div>
    </div>
  )
}

export default Talents