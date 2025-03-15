import { Badge, Tabs } from '@mantine/core'
import JobDetails from '../JobDetails/JobDetails'
import TalentCard from '../FindTalent/TalentCard'
import { useEffect, useState } from 'react'

const PostedJobDetails = (props: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [applicants, setApplicants] = useState([]);

  const handleTabChange = (value: any) => {
    setActiveTab(value);
    if (value == "applicants") {
      setApplicants(props.applicants?.filter((x: any) => x.applicationStatus == "APPLIED"));
    } else if (value == "invited") {
      setApplicants(props.applicants?.filter((x: any) => x.applicationStatus == "INTERVIEWING"));
    } else if (value == "offered") {
      setApplicants(props.applicants?.filter((x: any) => x.applicationStatus == "OFFERED"));
    } else if (value == "rejected") {
      setApplicants(props.applicants?.filter((x: any) => x.applicationStatus == "REJECTED"));
    }
  }

  useEffect(() => {
    handleTabChange("overview")
  }, [props]);

  return (
    <div className='mt-5 w-3/4 px-5 '>
      {props.jobTitle
        ? <>
          <div className="text-2xl font-semibold flex items-center">
            {props.jobTitle}
            <Badge ml="sm" size='sm' variant="light" color='brightSun.4'>
              {props.jobStatus}
            </Badge></div>
          <div className='font-medium text-mine-shaft-300 mb-5 '>{props.location}</div>
          <div>
            <Tabs variant="outline" radius="lg" value={activeTab} onChange={handleTabChange}>
              <Tabs.List className="[&_button]:!text-lg font-semibold mb-5  [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className='[&>div]:w-full'>
                <JobDetails {...props} edit closed={props.jobStatus == "CLOSED"} />
              </Tabs.Panel>
              <Tabs.Panel value="applicants">
                {<div className="mt-10 flex flex-wrap gap-5 justify-between">
                  {applicants?.length ? applicants.map((talent: any, index: number) =>
                    <TalentCard key={index} {...talent} posted />) : <div className='text-2xl font-semibold'>No Applicants</div>}
                </div>}
              </Tabs.Panel>
              <Tabs.Panel value="invited">
                {<div className="mt-10 flex flex-wrap gap-5 justify-between">
                  {applicants?.length ? applicants.map((talent: any, index: number) =>
                    <TalentCard key={index} {...talent} invited />) : <div className='text-2xl font-semibold'>No Invited Candidates</div>}
                </div>}
              </Tabs.Panel>
              <Tabs.Panel value="offered">
                {<div className="mt-10 flex flex-wrap gap-5 justify-between">
                  {applicants?.length ? applicants.map((talent: any, index: number) =>
                    <TalentCard key={index} {...talent} offered />) : <div className='text-2xl font-semibold'>No Offered Candidates</div>}
                </div>}
              </Tabs.Panel>
              <Tabs.Panel value="rejected">
                {<div className="mt-10 flex flex-wrap gap-5 justify-between">
                  {applicants?.length ? applicants.map((talent: any, index: number) =>
                    <TalentCard key={index} {...talent} rejected />) : <div className='text-2xl font-semibold'>No Rejected Candidates</div>}
                </div>}
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
        : <div className='text-2xl font-semibold min-h-[70vh] flex justify-center items-center'>No Job Found</div>}

    </div>
  )
}

export default PostedJobDetails