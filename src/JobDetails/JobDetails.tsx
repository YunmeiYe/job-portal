import { ActionIcon, Button, Divider } from "@mantine/core"
import { IconBookmark } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { card, desc, skills } from "../Data/JobDescData"
import DOMPurify from "dompurify"

const JobDetails = (props: any) => {
  const cleanHTML = DOMPurify.sanitize(desc);

  return (
    <div className="w-2/3">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img className="h-14" src={`src/assets/Icons/Google.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">Software Engineer</div>
            <div className="text-xs text-mine-shaft-300">Google &#x2022; 3 days ago &#x2022; 48 Applicants</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link to={"/apply-job"}>
            <Button color="brightSun.4" size="sm" variant="light">{props.edit ? "Edit" : "Apply"}</Button>
          </Link>
          {props.edit
            ? <Button color="red.4" size="sm" variant="outline">Delete</Button>
            : <IconBookmark className="text-bright-sun-400 cursor-pointer" stroke={1.5}/>}
        </div>
      </div>
      <Divider my="xl" />
      <div className="flex justify-between">
        {card.map((item, index) =>
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon className="!h-12 !w-12" color="brightSun.4" variant="light" size="lg" radius="xl" aria-label="Settings">
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">{item.value}</div>
          </div>
        )}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) =>
            <ActionIcon key={index} className="!h-fit !w-fit font-medium !text-sm" color="brightSun.4" variant="light" size="lg" p="xs" radius="xl" aria-label="Settings">
              {skill}
            </ActionIcon>
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div className="[&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify" dangerouslySetInnerHTML={{ __html: cleanHTML }}>
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img className="h-8" src={`src/assets/Icons/Google.png`} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">Google</div>
              <div className="text-mine-shaft-300">10K+ Employees</div>
            </div>
          </div>
          <Link to={"/company"}>
            <Button color="brightSun.4" variant="light">Company Page</Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify">
          Here at UIHUT, we are a passionate, fun-loving, growing team. We are looking for talented programmers who enjoy solving technical challenges and are eager to learn and incorporate new technologies into their skillset. This role offers an exciting opportunity to work on innovative projects that impact millions of users worldwide.
        </div>
      </div>
    </div>
  )
}

export default JobDetails