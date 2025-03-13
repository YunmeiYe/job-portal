import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react"
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar size={"lg"} src={props.avatar} alt="" />
          </div>
          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">{props.role} &bull; {props.company}</div>
          </div>
        </div>
        <IconHeart stroke={1.5} className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {props.topSkills.map((skill: any, index: any) =>
          <div key={index} >
            {skill}
          </div>
        )}
      </div>
      <Text size="xs" className="text-mine-shaft-300" lineClamp={3}>
        {props.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      {props.invited
        ? <div className='flex gap-1 text-mine-shaft-200 text-sm items-center'><IconCalendarMonth stroke={1.5} className='w-5 h-5' />Interview: March 27, 2025 10:00:00 AM</div>
        : <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">
            {props.expectedSalary}
          </div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
            <IconMapPin className="w-5 h-5" stroke={1.5} /> {props.location}
          </div>
        </div>
      }
      <Divider size="xs" color="mineShaft.7" />
      <div className='flex [&>*]:w-1/2 [&>*]:p-1'>
        {
          !props.invited && <>
            <Link to={"/talent-profile"}>
              <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
            </Link>
            <div>
              {props.posted
                ? <Button onClick={open} rightSection={<IconCalendarMonth className='w-5 h-5' />} color="brightSun.4" variant="light" fullWidth>Schedule</Button>
                : <Button color="brightSun.4" variant="light" fullWidth>Message</Button>}
            </div>
          </>
        }
        {props.invited && <>
          <div>
            <Button color="brightSun.4" variant="outline" fullWidth>Accept</Button>
          </div>
          <div>
            <Button color="brightSun.4" variant="light" fullWidth>Reject</Button>
          </div>
        </>
        }
      </div>
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-4'>
          <DateInput value={value} minDate={new Date()} onChange={setValue} label="Date" placeholder="Enter Date" />
          <TimeInput label="Time" ref={ref} onClick={() => ref.current?.showPicker()} />
          <Button color="brightSun.4" variant="light" fullWidth>Schedule</Button>
        </div>
      </Modal>
    </div>
  )
}

export default TalentCard