import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT"
}
const SignUp = () => {
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    if (typeof (event) == "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name, value = event.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Password do not match.";
      setFormError({ ...formError, [name]: signupValidation(name, value), confirmPassword: err });

    }
    if (name === "confirmPassword") {
      if (data.password !== value) setFormError({ ...formError, [name]: "Password do not match." });
      else setFormError({ ...formError, confirmPassword: "" });
    }
  }

  const handleSubmit = () => {
    let valid = true, newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === "accountType") continue;
      newFormError[key] = signupValidation(key, data[key as keyof typeof data]);
      if (data[key as keyof typeof data] !== data["password"]) newFormError["key"] = "Password do not match."
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);

    if (valid) {
      registerUser(data).then(res => {
        console.log(res);
        setData(form);
        notifications.show({
          title: 'Registered Successfully',
          message: 'Redirecting to login page...',
          withCloseButton: true,
          icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
          color: "teal",
          withBorder: true,
          className: "!border-green-500"
        })
        setTimeout(() => {
          navigate("/login");
        }, 4000)
      }).catch(err => {
        console.log(err);
        notifications.show({
          title: 'Registration Failed',
          message: err.response.data.errorMessage,
          withCloseButton: true,
          icon: <IconX style={{ width: "90%", height: "90%" }} />,
          color: "red",
          withBorder: true,
          className: "!border-red-500"
        })
      });
    }
  }

  return (
    <div className='w-1/2 px-20 flex flex-col justify-center gap-3'>
      <div className='text-2xl font-semibold'>Create Account</div>
      <TextInput value={data.name} error={formError.name} onChange={handleChange} name="name" label="Full Name" placeholder="Your name" withAsterisk />
      <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email" leftSection={<IconAt size={16} />} label="Email" placeholder="Your email" withAsterisk />
      <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password" leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" withAsterisk />
      <PasswordInput value={data.confirmPassword} error={formError.confirmPassword} onChange={handleChange} name="confirmPassword" leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm password" withAsterisk />
      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        name="accountType"
        label="You are?"
        withAsterisk
      >
        <Group mt={"xs"}>
          <Radio className="py-4 px-6 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 border border-mine-shaft-800 has-[:checked]:border-bright-sun-400 rounded-lg" autoContrast value="APPLICANT" label="Applicant" />
          <Radio className="py-4 px-6 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 border border-mine-shaft-800 has-[:checked]:border-bright-sun-400 rounded-lg" autoContrast value="EMPLOYER" label="Employer" />
        </Group>
      </Radio.Group>
      <Checkbox autoContrast label={<>I accept{' '}<Anchor>terms and conditions</Anchor></>} />
      <Button onClick={handleSubmit} autoContrast variant="filled">Sign Up</Button>
      <div className="mx-auto">
        Have an account?
        <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={() => { navigate("/login"); setData(form); setFormError(form) }}> Login</span>
      </div>
    </div>
  )
}

export default SignUp