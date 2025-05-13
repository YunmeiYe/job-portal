import { searchFields } from "../../data/TalentData"
import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core"
import { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../store/filterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState('');
  const [opened, { toggle }] = useDisclosure(false);
  const matches = useMediaQuery('(max-width: 475px)');

  const handleChange = (name: any, event: any) => {
    if (name == "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      dispatch(updateFilter({ name: event.target.value }));
      setName(event.currentTarget.value);
    }
  }

  return (
    <div>
      <div className="flex justify-end">
        {matches && <Button onClick={toggle} size="compact-sm" variant="outline" m="sm" radius="lg" autoContrast color="brightSun.4">{opened ? "Close" : "Filters"}</Button>}
      </div>
      <Collapse in={opened || !matches} transitionDuration={200} transitionTimingFunction="ease">
        <div className="lg-mx:!flex-wrap flex items-center !text-mine-shaft-100 px-5 py-8">
          <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 flex items-center">
            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20} /></div>
            <Input defaultValue={name} onChange={(e) => handleChange("name", e)} className="[&-input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name" />
          </div>
          {searchFields.map((item, index) =>
            <React.Fragment key={index}>
              <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1">
                <MultiInput {...item} />
              </div>
              <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
            </React.Fragment>
          )}
          <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 lg-mx:mt-7 text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10">
            <div className="flex text-sm justify-between">
              <div>Experience (Year)</div>
              <div>{value[0]} - {value[1]} </div>
            </div>
            <RangeSlider
              color="brightSun.4"
              size={"xs"}
              value={value}
              min={1}
              max={50}
              minRange={1}
              onChange={setValue}
              onChangeEnd={(e) => handleChange("exp", e)}
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