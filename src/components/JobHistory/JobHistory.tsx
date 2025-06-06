import { Tabs } from '@mantine/core'
import Card from './Card'
import { useEffect, useState } from 'react';
import { getAllJobs } from '../../services/jobService';
import { errorNotification } from '../../services/notification';
import { useSelector } from 'react-redux';

const JobHistory = () => {
  const [activeTab, setActiveTab] = useState('APPLIED');
  const [jobList, setJobList] = useState([]);
  const [showList, setShowList] = useState([]);
  const { user } = useSelector((state: any) => state.auth);
  const profile = useSelector((state: any) => state.profile);

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
      setShowList(res.filter((job: any) => job.applicants?.filter((applicant: any) => applicant.applicantId == user.id && applicant.applicationStatus == "APPLIED").length > 0));
    }).catch((err) => {
      errorNotification("Error", err.message);
    })
  }, [])

  const handleTabChange = (value: any) => {
    setActiveTab(value);
    if (value === "SAVED") {
      setShowList(jobList.filter((job: any) => profile.savedJobs.includes(job.id)));
    } else {
      setShowList(jobList.filter((job: any) => job.applicants?.filter((applicant: any) => applicant.applicantId == profile.id && applicant.applicationStatus == value).length > 0));
    }
  }

  return (
    <div>
      <div className="text-2xl font-semibold mb-5">Job history</div>
      <div>
        <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" defaultValue="APPLIED">
          <Tabs.List className="[&_button]:!text-xl sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm sm-mx:!text-lg font-semibold xs-mx:font-medium xs-mx:[&_button]:!p-1.5 mb-5 [&_button[data-active='true']]:text-bright-sun-500 dark:[&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={activeTab}>
            <div className="mt-10 flex flex-wrap gap-5">
              {showList.map((job: any, index: any) =>
                <Card key={index} {...job} {...{ [activeTab.toLowerCase()]: true }} />
              )}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default JobHistory