import { TextInput } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import AccentButton from "../AccentButton";

const Subscribe = () => {
  const matches = useMediaQuery('(max-width: 639px)');
  const matchesSM = useMediaQuery('(max-width: 475px)');

  return (
    <div className="mt-20 flex flex-wrap items-center bg-light-cream-50 dark:bg-mine-shaft-900 mx-20 sm-mx:mx-5 py-3 rounded-xl justify-around">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5 text-center font-semibold">
        Never Wants to Miss Any <span className="text-bright-sun-500 dark:text-bright-sun-400">Job News </span>?
      </div>
      <div className="flex xs-mx:flex-col gap-4 xs-mx:gap-1 rounded-xl bg-light-cream-100 dark:bg-mine-shaft-700 px-3 py-2 items-center">
        <TextInput
          className="[&_input]:text-foreground font-semibold"
          variant="unstyled"
          placeholder="Your@email.com"
          size={matchesSM ? "sm" : matches ? "md" : "lg"}
        />
        <AccentButton className='hover:!bg-bright-sun-400 dark:hover:!bg-bright-sun-500 !rounded-lg' size={matchesSM ? "sm" : matches ? "md" : "lg"} variant="filled" autoContrast>Subscribe</AccentButton>
      </div>
    </div>
  )
}

export default Subscribe