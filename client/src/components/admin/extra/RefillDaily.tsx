import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  Avatar,
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
import { AppDispatch, RootState } from '../../../app/store';
import { getrefillDaily } from '../../../features/RefillInsights/refillInsightsThunk';

const RefillDaily = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Get data from Redux store
  const refillRequests = useSelector(
    (state: RootState) => state.RefillInsights.RefillRequestDaily.data
  );

  // Fetch data when the selected date changes
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Format the date correctly
      dispatch(getrefillDaily(formattedDate));
    }
  }, [selectedDate, dispatch]);

  return (
    <div className="flex gap-4">
      {/* Date Picker */}
      <Card className="w-full shadow-none border-[1px] rounded-[6px]">
        <CardHeader title="Daily Requests Overview" />
        <CardContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              value={selectedDate}
              displayStaticWrapperAs="desktop"
              onChange={(newDate) => setSelectedDate(newDate)}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card className="w-full shadow-none border-[1px] rounded-[6px] bg-gray-50">
        <CardHeader
          title="Today’s Requests"
          action={
            <Box className="flex gap-2 bg-white p-2 rounded-[6px]">
              <Chip
                label={`Approved ${refillRequests.totalApproved}`}
                className="bg-green-500 text-white font-Inria" size='small'
              />
              <Chip
                label={`Pending ${refillRequests.totalPending}`}
                className="bg-yellow-400 text-white font-Inria" size='small'
              />
              <Chip
                label={`Rejected ${refillRequests.totalRejected}`}
                className="bg-red-500 text-white font-Inria" size='small'
              />
            </Box>
          }
        />

        <CardContent className="overflow-y-scroll max-h-[400px]">
          {refillRequests.data && refillRequests.data.length > 0 ? (
            refillRequests.data.map((request, index) => (
              <Box
                key={index}
                className="flex  bg-white p-4 rounded-[6px] gap-4 my-2 hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <Avatar
                  src={request.avatar}
                  alt={request.fullname}
                  sx={{ width: '50px', height: '50px' }}
                />
                <Box className="flex flex-col gap-1 h-max">
                  <Box className="flex gap-2 items-center">
                    <Typography variant="body1" className="font-bold">
                      ${request.amount}
                    </Typography>
                    <span className="font-Inria">attended to</span>
                    <Typography
                      variant="body2"
                      className="font-bold text-[12px] text-white bg-primary-main rounded-xl h-max px-2"
                    >
                      {request.fullname}
                    </Typography>
                  </Box>
                  <DateCell date={request.date} />
                </Box>
                <Chip
                  label={request.status}
                  variant="outlined"
                  className={`text-[10px] p-0 self-center ml-auto ${
                    request.status === 'pending'
                      ? 'bg-yellow-400 text-white border-yellow-100 border-4'
                      : request.status === 'approved'
                        ? 'bg-green-400 text-white border-green-100 border-4'
                        : 'bg-red-400 text-white border-red-100 border-4'
                  }`}
                />
              </Box>
            ))
          ) : (
            <Typography variant="body2" className="text-gray-500 text-center">
              No requests found for this date.
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RefillDaily;
