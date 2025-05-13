import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginValidation } from "../../services/formValidation"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch, useSelector } from "react-redux"
import { errorNotification } from "../../services/notification"
import { loginUser } from "../../services/authService"
import { ThunkDispatch } from "@reduxjs/toolkit"

const Login = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  const form = { email: "", password: "" }
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
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
      dispatch(loginUser(data)).unwrap().then(() => {
        setData(form);
        setTimeout(() => {
          navigate("/");
        }, 2000)
      }).catch((err: any) => {
        errorNotification("Login Failed", err.message);
      });
    }
  }
  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'brightSun.4', type: 'bars' }}
      />
      <div className='w-1/2 sm-mx:w-full px-20 md-mx:px-10 sm-mx:px-5 flex flex-col justify-center gap-3'>
        <div className='text-2xl font-semibold'>Welcome Back</div>
        <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email" label="Email" placeholder="Your email" withAsterisk leftSection={<IconAt size={16} />} />
        <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password" label="Password" placeholder="Password" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} />
        <Button onClick={handleSubmit} loading={isLoading} autoContrast variant="filled">Login</Button>
        <div className="mx-auto sm-mx:text-sm">
          Don't have an account?
          <span className="text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm" onClick={() => { navigate("/sign-up"); setData(form); setFormError(form) }}> Sign Up</span>
        </div>
        <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center sm-mx:text-sm">Forget Password?</div>
        <ResetPassword opened={opened} close={close} />
      </div>
    </>
  )
}

export default Login
