import { Button, Modal, Text } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux';
import { setSessionExpired } from '../store/authSlice';

const SessionWatcher = () => {
  const sessionExpired = useSelector((state: any) => state.auth.sessionExpired);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setSessionExpired(false));
    window.location.href = "/login";
  };
  return (
    <Modal
      opened={sessionExpired}
      onClose={() => dispatch(setSessionExpired(false))}
      title={<div className='px-3'>Session Expired</div>}
      centered
      overlayProps={{ opacity: 1, blur: "6px" }}
      zIndex={1000}
    >
      <div className='flex flex-col gap-6 px-3'>
        <Text>Please log in again to continue.</Text>
        <div className='flex justify-end'>
          <Button onClick={handleLogin} autoContrast variant="filled">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default SessionWatcher