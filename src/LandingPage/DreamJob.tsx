import { Avatar, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

const DreamJob = () => {
  return (
    <div className="flex items-center px-16">
      <div className="flex flex-col w-[45%] gap-3">
        <div className="text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400">
          Find your <span>dream</span> <span>job</span> with us
        </div>
        <div className="text-lg text-mine-shaft-200">
          Good life begins with a good company. Start explore thousands of job in one place.
        </div>
        <div className="flex gap-3 mt-5">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label="Job Title"
            placeholder="Software Engineer"
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            variant="unstyled"
            label="Job Type"
            placeholder="Fulltime"
          />
          <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
            <IconSearch className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>
      <div className="w-[55%] flex items-center justify-center">
        <div className="w-[30rem] relative">
          <img src="/assets/boy.png" alt="boy" />
          <div className="w-fit absolute top-[45%] -right-10 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center mb-1 text-sm text-mine-shaft-100">10K+ got job</div>
            <Avatar.Group>
              <Avatar src="/assets/avatar.png" />
              <Avatar src="/assets/avatar1.png" />
              <Avatar src="/assets/avatar2.png" />
              <Avatar>+9K</Avatar>
            </Avatar.Group>
          </div>
          <div className="w-fit absolute top-[20%] -left-5 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md gap-2 flex flex-col">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                <img src="/assets/Google.png" alt="Google" />
              </div>
              <div className="text-sm text-mine-shaft-100">
                <div>Software Engineer</div>
                <div className="text-mine-shaft-200">New York</div>
              </div>
            </div>
            <div className="flex gap-2 justify-around text-mine-shaft-100 text-xs">
              <span>1 day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DreamJob