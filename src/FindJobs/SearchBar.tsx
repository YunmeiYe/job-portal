import MultiInput from "./MultiInput"
import { dropdownData } from "../Data/JobsData"
import { Divider, RangeSlider } from "@mantine/core"
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([80, 150]);

  const handleChange = (event: any) => {
      dispatch(updateFilter({ salary: event }));
  }
  
  return (
    <div className="flex px-5 py-8">
      {dropdownData.map((item, index) =>
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </React.Fragment>
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
          min={40}
          max={300}
          minRange={1}
          onChange={setValue}
          onChangeEnd={(e) => handleChange(e)}
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