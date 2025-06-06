import Marquee from "react-fast-marquee"
import { companies } from "../../data/Data"

const Companies = () => {
  return (
    <div className="mt-20">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-10">
        Trusted by <span className="text-primary">1000+</span> companies
      </div>
      <Marquee pauseOnHover={true}>
        {companies.map((company, index) => (
          <div key={index} className="mx-8 sm-mx:mx-6 xs-mx:mx-4 xsm-mx:mx-2 px-2 py-1 hover:bg-light-cream-50 dark:hover:bg-mine-shaft-900 rounded-xl cursor-pointer">
            <img className="h-14" src={`/assets/Companies/${company}.png`} alt={company} />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default Companies