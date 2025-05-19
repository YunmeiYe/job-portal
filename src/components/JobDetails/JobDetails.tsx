import { ActionIcon, Button, Divider, useMantineColorScheme } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { card } from "../../data/JobDescData"
import DOMPurify from "dompurify"
import { timeAgo } from "../../utils/common"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { postJob } from "../../services/jobService"
import { errorNotification, successNotification } from "../../services/notification"
import { updateProfile } from "../../services/profileService"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { desc } from "../../data/JobDescData"
import AccentButton from "../AccentButton"

const JobDetails = (props: any) => {
  // const cleanHTML = DOMPurify.sanitize(props.description);
  const cleanHTML = DOMPurify.sanitize(desc);
  const [applied, setApplied] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {colorScheme} = useMantineColorScheme()

  useEffect(() => {
    if (props.applicants?.filter((applicant: any) => applicant.applicantId == user.id).length > 0) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [props])

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

  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" }).then(() => {
      successNotification("Success", "Job closed successfully");
      setTimeout(() => { window.location.reload() }, 1000);
    }).catch((err) => {
      errorNotification("Error", err.message);
    });
  }

  return (
    <div className="w-2/3 mx-auto bs-mx:w-full">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-light-cream-300 dark:bg-mine-shaft-800 rounded-xl shrink-0">
            <img className="h-14 w-14 sm-mx:h-10 sm-mx:w-10" src={`/assets/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl xs-mx:text-xl">{props.jobTitle}</div>
            <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300 flex flex-wrap xs-mx:text-xs">
              {props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col gap-2 items-center sm-mx:my-2 sm-mx:w-full sm-mx:[&>button]:w-1/2 sm-mx:[&>a]:w-1/2">
          {(props.edit || !applied) &&
            <Link to={props.edit ? `/post-job/${props.id}` : `/apply-job/${props.id}`} className="text-center">
              <AccentButton size="sm" fullWidth variant="light" >{props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}</AccentButton>
            </Link>
          }
          {!props.edit && applied && <Button color="green.8" size="sm" variant="light" className="pointer-events-none">Applied</Button>}
          {
            props.edit && !props.closed
              ? <Button onClick={handleClose} color="red.4" size="sm" variant="outline">Close</Button>
              : profile?.savedJobs?.includes(props.id)
                ? <IconBookmarkFilled onClick={handleSaveJob} className="cursor-pointer text-primary" />
                : <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-700 dark:text-mine-shaft-300 cursor-pointer hover:text-primary" />
          }
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex sm-mx:flex-wrap justify-between gap-4 sm-mx:gap-2">
        {card.map((item, index) =>
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8" color={colorScheme === "dark" ? "brightSun.4" : "brightSun.5"} variant="light" size="lg" radius="xl" aria-label="Settings">
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-mine-shaft-700 dark:text-mine-shaft-300 xs-mx:text-sm">{item.name}</div>
            <div className="font-semibold xs-mx:text-sm">{item.id == "packageOffered" && <>$</>}{props ? props[item.id] : "NA"}</div>
          </div>
        )}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {props?.skillsRequired?.map((skill: string, index: number) =>
            <ActionIcon key={index} className="!h-fit !w-fit font-medium !text-sm xs-mx:!text-xs" color={colorScheme === "dark" ? "brightSun.4" : "brightSun.5"} variant="light" size="lg" p="xs" radius="xl" aria-label="Settings">
              {skill}
            </ActionIcon>
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div className="[&_*]:text-mine-shaft-700 dark:[&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-500 dark:[&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-800 dark:[&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_p]:text-sm [&_li]:text-sm" dangerouslySetInnerHTML={{ __html: cleanHTML }}>
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-light-cream-300 dark:bg-mine-shaft-800 rounded-xl">
              <img className="h-8" src={`/assets/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">{props.company}</div>
              <div className="text-mine-shaft-700 dark:text-mine-shaft-300">10K+ Employees</div>
            </div>
          </div>
          <Link to={`/company/${props.company}`}>
            <AccentButton variant="light">Company Page</AccentButton>
          </Link>
        </div>
        <div className="text-mine-shaft-700 dark:text-mine-shaft-300 text-justify xs-mx:text-sm">
          Here at UIHUT, we are a passionate, fun-loving, growing team. We are looking for talented programmers who enjoy solving technical challenges and are eager to learn and incorporate new technologies into their skillset. This role offers an exciting opportunity to work on innovative projects that impact millions of users worldwide.
        </div>
      </div>
    </div>
  )
}

export default JobDetails