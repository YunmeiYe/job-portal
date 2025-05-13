import MultiInput from "./MultiInput"
import { dropdownData } from "../../data/JobsData"
import { Button, Collapse, Divider, RangeSlider } from "@mantine/core"
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../store/filterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([80, 150]);
  const [opened, { toggle }] = useDisclosure(false);
  const matches = useMediaQuery('(max-width: 475px)');

  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  }

  return (
    <div>
      <div className="flex justify-end">
        {matches && <Button onClick={toggle} size="compact-sm" variant="outline" m="sm" radius="lg" autoContrast color="brightSun.4">{opened ? "Close" : "Filters"}</Button>}
      </div>
      <Collapse in={opened || !matches} transitionDuration={200} transitionTimingFunction="ease">
        <div className="lg-mx:!flex-wrap flex items-center !text-mine-shaft-100 px-5 py-8">
          {dropdownData.map((item, index) =>
            <React.Fragment key={index}>
              <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
                <MultiInput {...item} />
              </div>
              <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
            </React.Fragment>
          )}
          <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 lg-mx:mt-7 text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10">
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
      </Collapse>
    </div>
  )
}

export default SearchBar