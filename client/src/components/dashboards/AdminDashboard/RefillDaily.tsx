import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateCell from './dateCell';
import { DockTwoTone } from '@mui/icons-material';

const RefillDaily = () => {
  return (
    <div className="flex gap-4">
      <Card className="w-full shadow-none border-[1px] rounded-[6px]">
        <CardHeader title="Daily Requests Overview" />
        <CardContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker />
          </LocalizationProvider>
        </CardContent>
      </Card>
      <Card className="w-full shadow-none border-[1px] rounded-[6px] bg-gray-50">
        <CardHeader title="Today’s Requests" />
        <CardContent className="overflow-y-scroll max-h-[300px]">
          <Box className="flex bg-white p-4 rounded-[6px] gap-4 hover:shadow-sm transition-all duration-300 cursor-pointer">
            <Avatar
              src="/assets/avatars/hamid-el-filali.png"
              alt="a"
              sx={{ width: '50px', height: '50px' }}
            />
            <Box className="flex flex-col gap-1 h-max ">
              <Box className="flex gap-2 items-center">
                <Typography variant="body1" className="font-bold">
                  $5000
                </Typography>
                <span className="font-Inria">attended to</span>
                <Typography
                  variant="body2"
                  className="font-bold text-[12px] text-white bg-primary-main rounded-xl h-max px-2"
                >
                  oussama lmezouari
                </Typography>
              </Box>
              <DateCell date={'2025-02-22T19:32:38.987Z'} />
            </Box>
            <Chip
              label="Pendding"
              variant="outlined"
              className="text-[10px] p-0 self-center ml-auto bg-yellow-400 text-white border-yellow-100 border-4"
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
export default RefillDaily;
