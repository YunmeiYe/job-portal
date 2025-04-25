import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../Services/AuthService"

import { loginValidation } from "../Services/FormValidation"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch } from "react-redux"
import { setUser } from "../Slices/UserSlice"
import { errorNotification, successNotification } from "../Services/Notification"
import { authTokenChange } from "../Slices/AuthSlice"
import { jwtDecode } from "jwt-decode"
import { login } from "../Services/UserService"
import { scheduleTokenRefresh } from "../Services/TokenService"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = { email: "", password: "" }
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      login(data).then((res: any) => {
        setData(form);
        const decoded = jwtDecode(res.accessToken);
        let expiresIn = 0;
        if(decoded.exp && decoded.iat) {
          expiresIn = (decoded.exp - decoded.iat) * 1000;
        }
        dispatch(authTokenChange({ accessToken: res.accessToken, expiresIn: expiresIn }));
        scheduleTokenRefresh(navigate);
        dispatch(setUser({ ...decoded, email: decoded.sub }));
        successNotification("Login Successfully", 'Redirecting to home page ...');
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 3000)
      }).catch((err: any) => {
        setLoading(false);
        console.log(err);
        errorNotification("Login Failed", err.response.data.errorMessage);
      });
    }
  }
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'brightSun.4', type: 'bars' }}
      />
      <div className='w-1/2 px-20 flex flex-col justify-center gap-3'>
        <div className='text-2xl font-semibold'>Welcome Back</div>
        <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email" label="Email" placeholder="Your email" withAsterisk leftSection={<IconAt size={16} />} />
        <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password" label="Password" placeholder="Password" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} />
        <Button onClick={handleSubmit} loading={loading} autoContrast variant="filled">Login</Button>
        <div className="mx-auto">
          Don't have an account?
          <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={() => { navigate("/sign-up"); setData(form); setFormError(form) }}> Sign Up</span>
        </div>
        <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password?</div>
        <ResetPassword opened={opened} close={close} />
      </div>
    </>
  )
}

export default Login
