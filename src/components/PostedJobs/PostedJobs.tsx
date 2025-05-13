import { Tabs } from "@mantine/core"
import PostedJobCard from "./PostedJobCard"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const PostedJobs = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>('ACTIVE');
  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || 'ACTIVE');
  }, [props.job])

  const handleTabChange = (value:any) => {
    setActiveTab(value);
    const activeTabJobs = props.jobList?.filter((job: any) => job?.jobStatus == value);
    if (activeTabJobs.length > 0) {
      navigate(`/posted-jobs/${activeTabJobs[0].id}`);
    }
  }

  return (
    <div className="w-1/6 mt-5">
      <div className={matches? "hidden":"text-2xl font-semibold mb-5"}>My Jobs</div>
      <div>
        <Tabs value={activeTab} onChange={handleTabChange} autoContrast variant="pills">
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">Active [{props.jobList?.filter((job: any) => job?.jobStatus == 'ACTIVE').length}]</Tabs.Tab>
            <Tabs.Tab value="DRAFT">Drafts [{props.jobList?.filter((job: any) => job?.jobStatus == 'DRAFT').length}]</Tabs.Tab>
            <Tabs.Tab value="CLOSED">Closed [{props.jobList?.filter((job: any) => job?.jobStatus == 'CLOSED').length}]</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {props.jobList.filter((job: any) => job?.jobStatus == activeTab).map((item: any, index: number) =>
          <PostedJobCard key={index} {...item} />
        )}
      </div>
    </div>
  )
}

export default PostedJobs