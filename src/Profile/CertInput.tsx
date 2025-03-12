import { Button, TextInput } from "@mantine/core"
import { fields } from "../Data/ProfileData";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { useForm, isNotEmpty } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/Notification";

const CertInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      issuer: '',
      issueDate: new Date(),
      certificateId: ''
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("Issue date is required"),
      certificateId: isNotEmpty("Certificate ID is required")
    }
  });


  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    let cert = [...profile.certifications];
    cert.push(form.getValues());
    cert[cert.length - 1].issueDate = cert[cert.length - 1].issueDate.toISOString();
    let updatedProfile = { ...profile, certifications: cert };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", `Certificate added successfully`);
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='text-lg font-semibold'> {props.add ? "Add" : "Edit"} Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput {...form.getInputProps("name")} withAsterisk label="Title" placeholder="Enter title" />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput withAsterisk maxDate={new Date()} label="Issue date" placeholder="Pick date" {...form.getInputProps("issueDate")} />
        <TextInput {...form.getInputProps("certificateId")} withAsterisk label="Certificate ID" placeholder="Enter ID" />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
        <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
      </div>
    </div>
  )
}

export default CertInput