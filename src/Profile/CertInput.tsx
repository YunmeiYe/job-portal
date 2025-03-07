import { Button, TextInput } from "@mantine/core"
import { fields } from "../Data/ProfileData";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";

const CertInput = (props: any) => {
  const select = fields;
  const [issueDate, setIssueDate] = useState<Date | null>(new Date());

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-lg font-semibold'> {props.add ? "Add" : "Edit"} Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} />
        <TextInput withAsterisk label="Certificate ID" placeholder="Enter ID" />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput withAsterisk maxDate={new Date()} label="Issue date" placeholder="Pick date" value={issueDate} onChange={setIssueDate} />
      </div>
      <div className="flex gap-5">
        <Button onClick={() => props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
        <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
      </div>
    </div>
  )
}

export default CertInput