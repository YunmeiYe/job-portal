import { TextInput, NumberInput, FileInput, Textarea, LoadingOverlay } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPaperclip } from '@tabler/icons-react'
import { useState } from 'react'
import { getBase64 } from '../../utils/common';
import { applyJob } from '../../services/jobService';
import { useNavigate, useParams } from 'react-router-dom';
import { errorNotification, successNotification } from '../../services/notification';
import { useSelector } from 'react-redux';
import AccentButton from '../AccentButton';

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
      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Invalid email address";
        return null;
      },
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
        <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
          <TextInput
            {...form.getInputProps('name')}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-700 dark:text-mine-shaft-300 font-semibold" : ""}`}
            label="Full Name"
            withAsterisk
            placeholder="Enter name"
          />
          <TextInput
            {...form.getInputProps('email')}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-700 dark:text-mine-shaft-300 font-semibold" : ""}`}
            label="Email"
            withAsterisk
            placeholder="Enter email"
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2 md-mx:gap-5 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
          <NumberInput
            {...form.getInputProps('phone')}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-700 dark:text-mine-shaft-300 font-semibold" : ""}`}
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
            className={`${preview ? "text-mine-shaft-700 dark:text-mine-shaft-300 font-semibold" : ""}`}
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
          className={`${preview ? "text-mine-shaft-700 dark:text-mine-shaft-300 font-semibold" : ""}`}
          label="Attach your CV"
          withAsterisk
          leftSection={<IconPaperclip stroke={1.5} />}
          placeholder="Your CV"
        />
        <Textarea
          {...form.getInputProps('coverLetter')}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-700 dark:text-mine-shaft-300 font-semibold" : ""}`}
          placeholder="Type something about yourself ..."
          label="Cover Letter"
          withAsterisk
          autosize
          minRows={4}
        />
        {!preview &&
          <AccentButton onClick={handlePreview} variant="light">Preview</AccentButton>
        }
        {preview &&
          <div className="flex gap-10 [&>*]:w-1/2">
            <AccentButton fullWidth onClick={handlePreview} variant="outline">Edit</AccentButton>
            <AccentButton fullWidth onClick={handleSubmit} variant="light">Submit</AccentButton>
          </div>
        }
      </div></div>
  )
}

export default ApplicationForm