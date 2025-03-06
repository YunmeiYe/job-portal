import { Button, Divider, FileInput, NumberInput, Textarea, TextInput, Notification, LoadingOverlay } from "@mantine/core"
import { IconCheck, IconPaperclip } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const ApplyJobComp = () => {
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [sec, setSec] = useState(5);
  const navigate = useNavigate();

  const handlePreview = () => {
    setPreview(!preview);
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = () => {
    setSubmit(true);
    let x = 5;
    setInterval(() => {
      x--;
      setSec(x);
      if (x === 0) {
        setSubmit(false);
        navigate("/find-jobs");
      }
    }, 1000);
  }

  return (
    <>
      <div className="w-2/3 mx-auto">
        <LoadingOverlay
          className="!fixed "
          visible={submit}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img className="h-14" src={`src/assets/Icons/Google.png`} alt="" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-2xl">Software Engineer</div>
              <div className="text-xs text-mine-shaft-300">Google &#x2022; 3 days ago &#x2022; 48 Applicants</div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        <div className="text-xl font-semibold mb-5">Submit Your  Application</div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-10 [&>*]:w-1/2">
            <TextInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
              label="Full Name"
              withAsterisk
              placeholder="Enter name"
            />
            <TextInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
              label="Email"
              withAsterisk
              placeholder="Enter email"
            />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <NumberInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
              label="Phone Number"
              withAsterisk
              placeholder="Enter phone number"
              hideControls
              min={0}
              max={9999999999}
              clampBehavior="strict"
            />
            <TextInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
              label="Personal Website"
              withAsterisk
              placeholder="Enter url"
            />
          </div>
          <FileInput
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Attach your CV"
            withAsterisk
            leftSection={<IconPaperclip stroke={1.5} />}
            placeholder="Your CV"
          />
          <Textarea
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            placeholder="Type something about yourself ..."
            label="Cover Letter"
            withAsterisk
            autosize
            minRows={4}
          />
          {!preview &&
            <Button onClick={handlePreview} color="brightSun.4" variant="light">Preview</Button>
          }
          {preview &&
            <div className="flex gap-10 [&>*]:w-1/2">
              <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline">Edit</Button>
              <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">Submit</Button>
            </div>
          }
        </div>
      </div>
      <Notification
        icon={<IconCheck size={20} />}
        className={`!border-bright-sun-400 -translate-y-20 !fixed top-0 left-[35%] z-[1001] transition duration-300 ease-in-out ${submit ? "translate-y-0" : "-translate-y-20"}`}
        withBorder color="teal"
        title="Application Submitted!"
        mt="md"
        withCloseButton={false}
      >
        Redirecting you to Find Jobs in {sec} seconds ...
      </Notification>
    </>
  )
}

export default ApplyJobComp