import { Carousel, CarouselSlide } from "@mantine/carousel"
import { jobCategories } from "../../data/Data"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

const JobCategory = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-10">
        Browse <span className="text-primary">Job</span> Category
      </div>
      <div className="text-lg sm-mx:text-base xsm-mx:text-sm text-mine-shaft-700 dark:text-mine-shaft-300 text-center mx-auto mb-10 w-1/2 sm-mx:w-11/12">
        Explore diverse job opportunities tailored to your skills. Start your career journey today!
      </div>
      <Carousel
        slideSize="22%"
        slideGap="md"
        loop
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-500 dark:[&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
        nextControlIcon={<IconArrowRight className="w-8 h-8" />}
        previousControlIcon={<IconArrowLeft className="w-8 h-8" />}>
        {jobCategories.map((category, index) =>
          <CarouselSlide key={index}>
            <div className="flex flex-col items-center w-64 h-58 sm-mx:w-56 sm-mx:h-52 xs-mx:w-48 xs-mx:h-42 gap-2 border border-primary p-5 my-5 transition duration-300 ease-in-out rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] !shadow-bright-sun-300">
              <div className="p-2 bg-bright-sun-400 dark:bg-bright-sun-300 rounded-full">
                <img className="w-8 h-8 sm-mx:w-6 sm-mx:h-6 xs-mx:w-4 xs-mx:h-4" src={`/assets/Categories/${category.name}.png`} alt={category.name} />
              </div>
              <div className="text-mine-shaft-800 dark:text-mine-shaft-200 text-xl sm-mx:text-lg xs-mx:text-base font-semibold">{category.name}</div>
              <div className="text-sm xs-mx:text-xs text-center text-mine-shaft-700 dark:text-mine-shaft-300">{category.desc}</div>
              <div className="text-lg sm-mx:text-base xs-mx:text-sm text-primary">{category.jobs} new job posted</div>
            </div>
          </CarouselSlide>)}
      </Carousel>
    </div>
  )
}

export default JobCategory