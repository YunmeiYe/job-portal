import { Avatar, Button, Divider, Text } from '@mantine/core'
import { IconHeart, IconMapPin } from "@tabler/icons-react"
import { Link } from 'react-router-dom'

const TalentCard = (props: any) => {
  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar size={"lg"} src={props.avatar} alt="" />
          </div>
          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">{props.role} &#x2022; {props.company}</div>
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
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          {props.expectedSalary}
        </div>
        <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
          <IconMapPin className="w-5 h-5" stroke={1.5} /> {props.location}
        </div>
      </div>
      <Divider size="xs" color="mineShaft.7" />
      <div className='flex [&>*]:w-1/2 [&>*]:p-1'>
        <Link to={"/talent-profile"}>
          <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
        </Link>
        <div>
          <Button color="brightSun.4" variant="light" fullWidth>Message</Button>
        </div>
      </div>
    </div>
  )
}

export default TalentCard