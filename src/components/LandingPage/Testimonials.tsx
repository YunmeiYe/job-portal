import { Avatar, Rating } from "@mantine/core"
import { testimonials } from "../../data/Data"

const Testimonials = () => {
  return (
    <div className="mt-20 pb-5 p-5">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold text-mine-shaft-100 mb-10">
        What <span className="text-bright-sun-400">User</span> says about us?
      </div>
      <div className="flex justify-evenly md-mx:flex-wrap gap-5 mt-10">
        {testimonials.map((data, index) =>
          <div key={index} className="flex flex-col gap-3 w-[23% md-mx:w-[48%] xs-mx:w-full border border-bright-sun-400 rounded-xl p-3 ">
            <Avatar className="!h-16 !w-16" src={data.avatar} alt="it's me" />
            <div className="flex gap-2 items-center">
              <div className="text-lg sm-mx:text-base xs-mx:text-sm text-mine-shaft-100 font-semibold">{data.name}</div>
              <Rating value={data.rating} fractions={2} readOnly />
            </div>
            <div className="text-xs text-mine-shaft-300">
              {data.testimonial}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Testimonials