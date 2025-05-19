import { Avatar, Button, Divider, Modal, Text, useComputedColorScheme } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconHeartFilled, IconMapPin } from "@tabler/icons-react"
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getProfile } from '../../services/profileService';
import { changeAppStatus } from '../../services/jobService';
import { errorNotification, successNotification } from '../../services/notification';
import { formatTime, openBase64PDF } from '../../utils/common';
import AccentButton from '../AccentButton';

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId).then((res) => {
        setProfile(res);
      }).catch((err) => {
        errorNotification("Error", err.message);
      })
    } else setProfile(props);
  }, [props.applicantId])

  const handleOffer = (status: string) => {
    let interview: any = { id, applicantId: profile?.id, applicationStatus: status };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date }
    }

    changeAppStatus(interview).then(() => {
      if (status == "INTERVIEWING") successNotification("Interview Scheduled", "Interview scheduled successfully");
      else if (status == "OFFERED") successNotification("Offered", "Offer has been sent successfully");
      else successNotification("Rejected", "Application has been rejected");
      setTimeout(() => { window.location.reload() }, 1000);
    }).catch((err) => {
      errorNotification("Error", err.message);
    })
  }

  const handleSaveTalent = () => { } // TODO: implement save talent functionality

  return (
    <div className="bg-light-cream-50 dark:bg-mine-shaft-900 p-4 w-96 sm-mx:w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-500 dark:!shadow-bright-sun-400 transition duration-300 ease-in-out">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-light-cream-300 dark:bg-mine-shaft-800 rounded-full">
            <Avatar size={"lg"} src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/assets/avatar.png"} alt="" />
          </div>
          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300">{profile.jobTitle} &bull; {profile.company}</div>
          </div>
        </div>
        {profile?.savedJobs?.includes(props.id)
          ? <IconHeartFilled onClick={handleSaveTalent} className="cursor-pointer text-red-500" />
          : <IconHeart onClick={handleSaveTalent} className="text-mine-shaft-700 dark:text-mine-shaft-300 cursor-pointer hover:text-red-500" />}
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-light-cream-100 dark:[&>div]:bg-mine-shaft-800 [&>div]:text-primary [&>div]:rounded-lg text-xs">
        {profile?.skills?.map((skill: any, index: any) =>
          <div key={index} >{skill}</div>
        )}
      </div>
      <Text size="xs" className="text-mine-shaft-700 dark:text-mine-shaft-300" lineClamp={3}>{profile.about}</Text>
      <Divider size="xs" color={computedColorScheme === 'dark' ? "mineShaft.7" : "mineShaft.2"} />
      {props.invited
        ? <div className='flex gap-1 text-mine-shaft-800 dark:text-mine-shaft-200 text-sm items-center'><IconCalendarMonth stroke={1.5} className='w-5 h-5' />Interview: {formatTime(props.interviewTime)}</div>
        : <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-800 dark:text-mine-shaft-200 text-sm">Experience: {props.totalExp && props.totalExp > 1 ? props.totalExp + " Years" : 1 + " Year"} </div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-600 dark:text-mine-shaft-400">
            <IconMapPin className="w-5 h-5" stroke={1.5} /> {profile.location}
          </div>
        </div>
      }
      <Divider size="xs" />
      <div className='flex flex-wrap justify-between xsm:[&>*]:w-1/2 [&>*]:p-1'>
        {
          !props.invited && <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <AccentButton variant="outline" fullWidth>Profile</AccentButton>
            </Link>
            <div>
              {props.posted
                ? <AccentButton onClick={open} rightSection={<IconCalendarMonth className='w-5 h-5' />} variant="light" fullWidth>Schedule</AccentButton>
                : <AccentButton variant="light" fullWidth>Message</AccentButton>}
            </div>
          </>
        }
        {props.invited && <>
          <div><AccentButton onClick={() => handleOffer("OFFERED")} variant="outline" fullWidth>Accept</AccentButton></div>
          <div><AccentButton onClick={() => handleOffer("REJECTED")} variant="light" fullWidth>Reject</AccentButton></div>
        </>}
      </div>
      {(props.invited || props.posted) && <AccentButton onClick={openApp} variant="filled" autoContrast fullWidth>View Application</AccentButton>}
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-4'>
          <DateInput value={date} minDate={new Date()} onChange={setDate} label="Date" placeholder="Enter Date" />
          <TimeInput label="Time" value={time} onChange={(e) => setTime(e.currentTarget.value)} ref={ref} onClick={() => ref.current?.showPicker()} />
          <AccentButton onClick={() => { close(); handleOffer("INTERVIEWING") }} variant="light" fullWidth>Schedule</AccentButton>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Application Detail" centered>
        <div className='flex flex-col gap-4'>
          <div>
            Email:&emsp;<a className='text-bright-sun-500 dark:text-bright-sun-400 hover:underline cursor-pointer text-center' href={`mailto:${props.email}`}>{props.email}</a>
          </div>
          <div>
            Website:&emsp;<a className='text-bright-sun-500 dark:text-bright-sun-400 hover:underline cursor-pointer text-center' target='_blank' href={`${props.website}`}>{props.website}</a>
          </div>
          <div>
            Resume:&emsp;<span onClick={() => openBase64PDF(props.resume)} className='text-bright-sun-500 dark:text-bright-sun-400 hover:underline cursor-pointer text-center'>{props.name}</span>
          </div>
          <div>
            Cover Letter:&emsp;<div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TalentCard