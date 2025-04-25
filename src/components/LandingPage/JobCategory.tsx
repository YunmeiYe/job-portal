import { Carousel, CarouselSlide } from "@mantine/carousel"
import { jobCategories } from "../../data/Data"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

const JobCategory = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-10">
        Browse <span className="text-bright-sun-400">Job</span> Category
      </div>
      <div className="text-lg text-mine-shaft-300 text-center mx-auto mb-10 w-1/2">
        Explore diverse job opportunities tailored to your skills. Start your career journey today!
      </div>
      <Carousel
        slideSize="22%"
        slideGap="md"
        loop
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
        nextControlIcon={<IconArrowRight className="w-8 h-8" />}
        previousControlIcon={<IconArrowLeft className="w-8 h-8" />}>
        {jobCategories.map((category, index) =>
          <CarouselSlide key={index}>
            <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 my-5 transition duration-300 ease-in-out rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] !shadow-bright-sun-300">
              <div className="p-2 bg-bright-sun-300 rounded-full">
                <img className="w-8 h-8" src={`/assets/Categories/${category.name}.png`} alt={category.name} />
              </div>
              <div className="text-mine-shaft-200 text-xl font-semibold">{category.name}</div>
              <div className="text-sm text-center text-mine-shaft-300">{category.desc}</div>
              <div className="text-lg text-bright-sun-300">{category.jobs} new job posted</div>
            </div>
          </CarouselSlide>)}
      </Carousel>
    </div>
  )
}

export default JobCategory