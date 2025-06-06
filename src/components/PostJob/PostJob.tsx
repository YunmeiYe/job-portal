import { NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../../data/PostJobData"
import TextEditor from "./RichTextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import SelectInput from "./SelectInput";
import { getJob, postJob } from "../../services/jobService";
import { errorNotification, successNotification } from "../../services/notification";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AccentButton from "../AccentButton";

const PostJob = () => {
  const { id } = useParams();
  const [editorData, setEditorData] = useState(content)
  const select = fields;
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!user) navigate("/login");
    if (id && id !== "0") {
      getJob(id).then((res) => {
        form.setValues(res);
        setEditorData(res.description);
      }).catch((err) => {
        errorNotification("Error", err.message);
      });
    } else {
      form.reset();
      setEditorData(content);
    }
  }, [id])

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      jobTitle: '',
      company: '',
      experience: '',
      location: '',
      packageOffered: '',
      jobType: '',
      skillsRequired: [],
      about: '',
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty('Title is required'),
      company: isNotEmpty('Company is required'),
      experience: isNotEmpty('Experience is required'),
      location: isNotEmpty('Location is required'),
      packageOffered: isNotEmpty('Package is required'),
      jobType: isNotEmpty('Job type is required'),
      skillsRequired: isNotEmpty('Skills are required'),
      about: isNotEmpty('About is required'),
      description: isNotEmpty('Description is required'),
    }
  })

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "ACTIVE" }).then((res) => {
      successNotification("Success", "Job posted successfully");
      navigate(`/posted-jobs/${res.id}`);
    }).catch((err) => {
      errorNotification("Error", err.message);
    })
  }

  const handleDraft = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "DRAFT" }).then(() => {
      successNotification("Success", "Job drafted successfully");
      navigate("/posted-jobs/0");
    }).catch((err) => {
      errorNotification("Error", err.message);
    })
  }

  return (
    <div className="w-[90%] mx-auto">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput {...form.getInputProps("packageOffered")} label="Salary" placeholder="Enter Annual Salary" prefix="$" withAsterisk min={1} max={300000} hideControls />
        </div>
        <TagsInput {...form.getInputProps("skillsRequired")} withAsterisk label="Skills" placeholder="Enter skill" clearable acceptValueOnBlur splitChars={[',', ' ', '|']} />
        <Textarea withAsterisk label="About Job" autosize minRows={3} placeholder="Enter about job..." {...form.getInputProps("about")} />
        <div className="[&_button[data-active='true']]:!text-bright-sun-500 dark:[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
          <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span></div>
          <TextEditor form={form} data={editorData} />
        </div>
        <div className="flex gap-4">
          <AccentButton onClick={handlePost}  variant="filled" autoContrast>Publish Job</AccentButton>
          <AccentButton onClick={handleDraft} variant="outline">Save as Draft</AccentButton>
        </div>
      </div>
    </div>
  )
}

export default PostJob