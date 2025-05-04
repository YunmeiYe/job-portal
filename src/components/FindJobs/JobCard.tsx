import { IconBookmark, IconBookmarkFilled, IconBriefcase, IconClockHour3, IconMapPin, IconRecharging } from "@tabler/icons-react"
import { Button, Divider, Text } from '@mantine/core'
import { Link } from "react-router-dom"
import { timeAgo } from "../../utils/common"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { updateProfile } from "../../services/profileService"

const JobCard = (props: any) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleSaveJob = () => {
    let savedJobs = [...profile.savedJobs];
    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter(jobId => jobId !== props.id);
    } else {
      savedJobs.push(props.id);
    }
    let updatedProfile = { ...profile, savedJobs };
    dispatch(updateProfile(updatedProfile));
  }

  return (
    <div className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7" src={`/assets/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">{props.company} &bull; {props.applicants ? props.applicants.length : 0} Applicants</div>
          </div>
        </div>
        {profile?.savedJobs?.includes(props.id)
          ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-bright-sun-400" />
          : <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />}
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div className="flex gap-1"><IconBriefcase className="w-4 h-4" />{props.experience}</div>
        <div className="flex gap-1"><IconRecharging className="w-4 h-4" />{props.jobType}</div>
      </div>
      <div className="flex gap-1 px-2 text-xs text-bright-sun-400"><IconMapPin className="w-4 h-4" />{props.location}</div>
      <div className="h-1/4">
        <Text size="xs" className="text-mine-shaft-300" lineClamp={3}>
          {props.description}
        </Text>
      </div>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          ${props.packageOffered > 1000 ? props.packageOffered / 1000 + "K" : props.packageOffered}/yr
        </div>
        <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
          <IconClockHour3 className="w-5 h-5" stroke={1.5} />Posted {timeAgo(props.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">View</Button>
      </Link>
    </div>
  )
}

export default JobCard