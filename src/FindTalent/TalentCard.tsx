import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react"
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { getProfile } from '../Services/ProfileService';
import { changeAppStatus } from '../Services/JobService';
import { errorNotification, successNotification } from '../Services/Notification';
import { formatTime, openBase64PDF } from '../Services/Utilities';

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId).then((res) => {
        setProfile(res);
      }).catch((err) => {
        console.log(err);
      })
    } else setProfile(props);
  }, [props])
  
  const handleOffer = (status: string) => {
    // successNotification("Offered", "Offer has been sent successfully")
    let interview:any = { id, applicantId: profile?.id, applicationStatus: status};
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = {...interview, interviewTime: date }
    }

    changeAppStatus(interview).then(() => {
      if (status == "INTERVIEWING") successNotification("Interview Scheduled", "Interview scheduled successfully");
      else if (status == "OFFERED") successNotification("Offered", "Offer has been sent successfully");
      else successNotification("Rejected", "Application has been rejected");
      window.location.reload();
    }).catch((err) =>
    {
      console.log(err);
      errorNotification("Error", err.response.data.message);
    })
  }

  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar size={"lg"} src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/assets/avatar.png"} alt="" />
          </div>
          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">{profile.jobTitle} &bull; {profile.company}</div>
          </div>
        </div>
        <IconHeart stroke={1.5} className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {profile?.skills?.map((skill: any, index: any) =>
          <div key={index} >{skill}</div>
        )}
      </div>
      <Text size="xs" className="text-mine-shaft-300" lineClamp={3}>{profile.about}</Text>
      <Divider size="xs" color="mineShaft.7" />
      {props.invited
        ? <div className='flex gap-1 text-mine-shaft-200 text-sm items-center'><IconCalendarMonth stroke={1.5} className='w-5 h-5' />Interview: { formatTime(props.interviewTime)}</div>
        : <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">$160K</div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-400">
            <IconMapPin className="w-5 h-5" stroke={1.5} /> {profile.location}
          </div>
        </div>
      }
      <Divider size="xs" color="mineShaft.7" />
      <div className='flex [&>*]:w-1/2 [&>*]:p-1'>
        {
          !props.invited && <>
            <Link to={`/talent-profile/${profile?.id}`}>
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
          <div><Button onClick={()=>handleOffer("OFFERED")} color="brightSun.4" variant="outline" fullWidth>Accept</Button></div>
          <div><Button onClick={()=>handleOffer("REJECTED")} color="brightSun.4" variant="light" fullWidth>Reject</Button></div>
        </>}
      </div>
      {(props.invited || props.posted) && <Button onClick={openApp} color="brightSun.4" variant="filled" autoContrast fullWidth>View Application</Button>}
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className='flex flex-col gap-4'>
          <DateInput value={date} minDate={new Date()} onChange={setDate} label="Date" placeholder="Enter Date" />
          <TimeInput label="Time" value={time} onChange={(e)=>setTime(e.currentTarget.value)} ref={ref} onClick={() => ref.current?.showPicker()} />
          <Button onClick={()=>handleOffer("INTERVIEWING")} color="brightSun.4" variant="light" fullWidth>Schedule</Button>
        </div>
      </Modal>
      <Modal opened={app} onClose={closeApp} title="Application Detail" centered>
        <div className='flex flex-col gap-4'>
          <div>
            Email:&emsp;<a className='text-bright-sun-400 hover:underline cursor-pointer text-center' href={`mailto:${props.email}`}>{ props.email}</a>
          </div>
          <div>
            Website:&emsp;<a className='text-bright-sun-400 hover:underline cursor-pointer text-center' target='_blank' href={`${props.website}`}>{ props.website}</a>
          </div>
          <div>
            Resume:&emsp;<span onClick={()=>openBase64PDF(props.resume)} className='text-bright-sun-400 hover:underline cursor-pointer text-center'>{ props.name}</span>
          </div>
          <div>
            Cover Letter:&emsp;<div>{ props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TalentCard