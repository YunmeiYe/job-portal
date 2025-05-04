import { Button, Modal, PasswordInput, PinInput, TextInput } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react'
import { signupValidation } from '../../services/formValidation';
import { errorNotification, successNotification } from '../../services/notification';
import { useInterval } from '@mantine/hooks';
import { changePassword, sendOtp, verifyOtp } from '../../services/authService';
import { useSelector } from 'react-redux';

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  const [verified, setVerified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1)
  }, 1000);

  const handleSendOtp = () => {
    sendOtp(email).then(() => {
      successNotification("OTP Sent Successfully", "Enter OTP to reset.")
      setOtpSent(true);
      setResendLoader(true);
      interval.start();
    }).catch((err) => {
      errorNotification("OTP Sending Failed", err.message);
    })
  }

  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp).then(() => {
      successNotification("OTP Verified", "Enter new password.")
      setVerified(true);
    }).catch((err) => {
      setVerified(false);
      errorNotification("OTP Verification Failed", err.message);
    })
  }

  const resendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  }

  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  }

  const handleResetPassword = () => {
    changePassword(email, password).then(() => {
      successNotification("Password Changed Successfully", "Please login with new password.")
      props.close();
      setOtpSent(false);
      setVerified(false);
      setEmail("");
      setPassword("");
    }).catch((err) => {
      setVerified(false);
      errorNotification("Password Reset Failed", err.message);
    })
  }

  return (
    <Modal opened={props.opened} onClose={() => { props.close(); setEmail(""); setPassword("") }} title="Reset Password">
      <div className='flex flex-col gap-6'>
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size='md'
          name="email"
          label="Email"
          placeholder="Your email"
          withAsterisk
          leftSection={<IconAt size={16} />}
          rightSection={<Button onClick={handleSendOtp} size='xs' className='mr-1' autoContrast loading={isLoading && !otpSent} disabled={email === "" || otpSent} variant="filled">Get OTP</Button>}
          rightSectionWidth={'xl'} />
        {otpSent && <PinInput onComplete={handleVerifyOtp} type="number" length={6} className='mx-auto' size='md' gap='lg' />}
        {otpSent && !verified &&
          <div className='flex gap-2'>
            <Button onClick={resendOtp} fullWidth autoContrast loading={isLoading} variant="light" className={`${resendLoader ? "cursor-not-allowed" : "cursor-pointer"}`}>{resendLoader ? seconds : "Resend"}</Button>
            <Button onClick={changeEmail} fullWidth autoContrast variant="filled">Change Email</Button>
          </div>
        }
        {verified &&
          <PasswordInput
            value={password}
            error={passErr}
            onChange={(e) => { setPassword(e.target.value); setPassErr(signupValidation("password", e.target.value)) }}
            name="password"
            label="Password"
            placeholder="Password"
            withAsterisk
            leftSection={<IconLock size={18} stroke={1.5} />} />
        }
        {verified &&
          <Button onClick={handleResetPassword} fullWidth autoContrast variant="filled">Change Password</Button>
        }
      </div>
    </Modal>
  )
}

export default ResetPassword