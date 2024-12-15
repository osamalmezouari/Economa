import { HomeAlertPropsType } from './interfaces';
import { Alert } from '@mui/material';
export default function HomeAlert({ message, type }: HomeAlertPropsType) {
  return (
    <Alert
      className="fixed -top-[250px] transform"
      severity={type}
    >
      {message}
    </Alert>
  );
}
