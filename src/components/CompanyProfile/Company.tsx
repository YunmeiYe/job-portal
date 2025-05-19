import { Avatar, Divider, Tabs, useComputedColorScheme } from "@mantine/core"
import { IconMapPin } from "@tabler/icons-react"
import AboutComp from "./AboutComp"
import CompanyJobs from "./CompanyJobs"
import CompanyEmployees from "./CompanyEmployees"

const Company = () => {
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  return (
    <div className="w-3/4">
      <div className="relative">
        <img className="rounded-t-2xl" src="/assets/profileBanner.jpg" alt="" />
        <img className="w-36 h-36 rounded-3xl p-2 -bottom-1/4 absolute left-5 bg-light-cream-100 dark:bg-mine-shaft-950 border-light-cream-100 dark:border-mine-shaft-950 border-8" src="/assets/Icons/Google.png" alt="" />
      </div>
      <div className="px-3 mt-12">
        <div className="text-3xl font-semibold flex justify-between">
          Google
          <Avatar.Group>
            <Avatar src="/assets/avatar.png" />
            <Avatar src="/assets/avatar1.png" />
            <Avatar src="/assets/avatar2.png" />
            <Avatar color={computedColorScheme === 'dark' ? 'brightSun.4' : 'brightSun.5'}>+10k</Avatar>
          </Avatar.Group>
        </div>
        <div className="flex gap-1 text-lg items-center text-mine-shaft-700 dark:text-mine-shaft-300">
          <IconMapPin className="w-5 h-5" stroke={1.5} /> New York, United States
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <Tabs variant="outline" radius="lg" defaultValue="about">
          <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-500 dark:[&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="about"><AboutComp /></Tabs.Panel>
          <Tabs.Panel value="jobs"><CompanyJobs /></Tabs.Panel>
          <Tabs.Panel value="employees"><CompanyEmployees /></Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default Company