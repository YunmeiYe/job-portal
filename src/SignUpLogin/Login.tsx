import { Button, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../Services/UserService"
import { loginValidation } from "../Services/FormValidation"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"

const form = {
  email: "",
  password: "",
}
const Login = () => {
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);


  const handleChange = (event: any) => {
    let name = event.target.name, value = event.target.value;
    setData({ ...data, [name]: value })
    setFormError({ ...formError, [name]: loginValidation(name, value) });
  }

  const handleSubmit = () => {
    let valid = true, newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key as keyof typeof data]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      loginUser(data).then(res => {
        console.log(res);
        setData(form);
        notifications.show({
          title: 'Login Successfully',
          message: 'Redirecting to home page...',
          withCloseButton: true,
          icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
          color: "teal",
          withBorder: true,
          className: "!border-green-500"
        })
        setTimeout(() => {
          navigate("/");
        }, 4000)
      }).catch(err => {
        console.log(err);
        notifications.show({
          title: 'Login Failed',
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
      <div className='text-2xl font-semibold'>Welcome Back</div>
      <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email" label="Email" placeholder="Your email" withAsterisk leftSection={<IconAt size={16} />} />
      <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password" label="Password" placeholder="Password" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} />
      <Button onClick={handleSubmit} autoContrast variant="filled">Login</Button>
      <div className="mx-auto">
        Don't have an account?
        <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={() => { navigate("/sign-up"); setData(form); setFormError(form) }}> Sign Up</span>
      </div>
      <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password?</div>
      <ResetPassword opened={opened} close={close} />
    </div>
  )
}

export default Login