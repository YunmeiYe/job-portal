import { Divider } from "@mantine/core"
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../../utils/common";

const ApplyJobComp = (props: any) => {
  return (
    <div className="w-2/3 bs-mx:w-4/5 sm-mx:w-full mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-light-cream-300 dark:bg-mine-shaft-800 rounded-xl shrink-0">
            <img className="h-14 w-14 sm-mx:h-10 sm-mx:w-10" src={`/assets/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl xs-mx:text-xl">{props.jobTitle}</div>
            <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300 flex flex-wrap xs-mx:text-xs">
              {props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants ? props.applicants.length : 0} Applicants</div>
          </div>
        </div>
      </div>
      <Divider my="xl" />
      <ApplicationForm />
    </div>
  )
}

export default ApplyJobComp