import { Link, useLocation } from "react-router-dom"

const NavLinks = () => {
  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0" },
    { name: "Posted Jobs", url: "/posted-jobs/0" },
    { name: "Job History", url: "/job-history" },
  ]
  const location = useLocation();

  return (
    <div className='bs-mx:!hidden flex gap-5 dark:text-white h-full items-center'>
      {links.map((link, index) =>
        <div key={index} className={`${location.pathname === link.url ? "border-bright-sun-500 dark:border-bright-sun-400 text-bright-sun-500 dark:text-bright-sun-400" : "border-transparent"} border-b-[3px] h-1/2 flex items-center`}>
          <Link to={link.url} className='hover:text-bright-sun-500 dark:hover:text-bright-sun-400'>{link.name}</Link>
        </div>)}
    </div>
  )
}

export default NavLinks