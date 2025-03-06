import { searchFields } from "../Data/TalentData"
import { Divider, Input, RangeSlider } from "@mantine/core"
import { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([80, 150]);

  return (
    <div className="flex px-5 py-8">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20} /></div>
        <Input className="[&-input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name" />
      </div>
      {searchFields.map((item, index) =>
        <>
          <div key={index} className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </>
      )}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>&#x24;{value[0]} K - &#x24;{value[1]} K</div>
        </div>
        <RangeSlider
          color="brightSun.4"
          size={"xs"}
          value={value}
          min={50}
          max={200}
          onChange={setValue}
          labelTransitionProps={{
            transition: 'skew-down',
            duration: 150,
            timingFunction: 'linear',
          }} />
      </div>
    </div>
  )
}

export default SearchBar