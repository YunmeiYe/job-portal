import { Button, Checkbox, Textarea } from '@mantine/core';
import { fields } from '../Data/ProfileData'
import SelectInput from './SelectInput'
import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';

const ExpInput = (props: any) => {
  const select = fields;
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [checked, setChecked] = useState(false);
  const [desc, setDesc] = useState(props.description);

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-lg font-semibold'> { props.add? "Add": "Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />
      <Textarea withAsterisk label="Summary" autosize minRows={3} placeholder="Enter Summary..." value={desc} onChange={(event) => setDesc(event.currentTarget.value)} />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput withAsterisk maxDate={endDate || undefined} label="Start date" placeholder="Pick date" value={startDate} onChange={setStartDate} />
        <MonthPickerInput withAsterisk minDate={startDate || undefined} maxDate={new Date()} label="End date" placeholder="Pick date" value={endDate} onChange={setEndDate} disabled={checked } />
      </div>
      <Checkbox autoContrast checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} label="Currently working here" />
          <div className="flex gap-5">
            <Button onClick={()=>props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
            <Button onClick={()=>props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
          </div>
    </div>
  )
}

export default ExpInput