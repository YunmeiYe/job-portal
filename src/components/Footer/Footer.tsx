import { IconBowFilled, IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react"
import { footerLinks } from "../../data/Data"
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    location.pathname != "/sign-up" && location.pathname != "/login" &&
    <div className="pt-20 pb-5 p-4 flex flex-wrap gap-5 sm:justify-around ">
      <div className="w-1/4 sm-mx:w-1/3 xs-mx:w-full flex flex-col gap-4">
        <div className='flex gap-1 items-center text-primary'>
          <IconBowFilled stroke={1.25} className='w-7 h-7' />
          <div className='text-2xl font-semibold'>
            JobHook
          </div>
        </div>
        <div className="text-sm font-semibold text-mine-shaft-700 dark:text-mine-shaft-300">
          Job portal with user profiles, skill updates, certifications, work experience and admin job postings.
        </div>
        <div className="flex gap-3 text-primary [&>div]:bg-light-cream-50 dark:[&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer dark:hover:[&>div]:bg-mine-shaft-600">
          <div><IconBrandFacebook /></div>
          <div><IconBrandInstagram /></div>
          <div><IconBrandX /></div>
        </div>
      </div>
      {footerLinks.map((item, index) =>
        <div key={index}>
          <div className="text-lg font-semibold mb-4 text-primary">{item.title}</div>
          {item.links.map((link, index) =>
            <div key={index} className="text-mine-shaft-700 dark:text-mine-shaft-300 text-sm hover:text-bright-sun-500 dark:hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">
              {link}
            </div>)}
        </div>
      )}
    </div>
  )
}

export default Footer