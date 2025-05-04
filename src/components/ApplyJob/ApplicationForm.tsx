import { TextInput, NumberInput, FileInput, Textarea, Button, LoadingOverlay } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPaperclip } from '@tabler/icons-react'
import { useState } from 'react'
import { getBase64 } from '../../utils/common';
import { applyJob } from '../../services/jobService';
import { useNavigate, useParams } from 'react-router-dom';
import { errorNotification, successNotification } from '../../services/notification';
import { useSelector } from 'react-redux';

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth)
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty('Name is required'),
      email: isNotEmpty('Email is required'),
      phone: isNotEmpty('Phone is required'),
      website: isNotEmpty('Website is required'),
      resume: isNotEmpty('Resume is required'),
      coverLetter: isNotEmpty('Cover Letter is required'),
    }
  })

  const handlePreview = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    form.validate();
    if (!form.isValid()) return;
    setPreview(!preview);
  }

  const handleSubmit = async () => {
    setSubmit(true);
    let resume: any = await getBase64(form.getValues().resume);
    let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(",")[1] };
    applyJob(id!, applicant).then(() => {
      setSubmit(false);
      successNotification("Success", "Application submitted successfully");
      navigate("/job-history");
    }).catch((err) => {
      setSubmit(false);
      errorNotification("Error", err.message);
    })
  }

  return (
    <div>
      <LoadingOverlay
        className="!fixed "
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'brightSun.4', type: 'bars' }}
      />
      <div className="text-xl font-semibold mb-5">Submit Your  Application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps('name')}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Full Name"
            withAsterisk
            placeholder="Enter name"
          />
          <TextInput
            {...form.getInputProps('email')}
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
            {...form.getInputProps('phone')}
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
            {...form.getInputProps('website')}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Personal Website"
            withAsterisk
            placeholder="Enter url"
          />
        </div>
        <FileInput
          {...form.getInputProps('resume')}
          accept='/application/pdf'
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          label="Attach your CV"
          withAsterisk
          leftSection={<IconPaperclip stroke={1.5} />}
          placeholder="Your CV"
        />
        <Textarea
          {...form.getInputProps('coverLetter')}
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
      </div></div>
  )
}

export default ApplicationForm