import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { getusersTransfers } from '../../../../../features/RefillInsights/refillInsightsThunk';
import { UserTransfer } from '../../../../../types/RefillInsights';
import { CURRENCY_SYMBOL } from '../../../../../utils/constants';

const UsersTransfers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.RefillInsights.UsersTransfers
  );

  useEffect(() => {
    dispatch(getusersTransfers());
  }, [dispatch]);

  return (
    <Card className="mt-6 mb-6 rounded-[5px] border-[1px] shadow-none px-4 relative">
      <CardHeader
        className="h-24 p-0"
        title={
          <Box className="flex justify-between">
            <Typography variant="h5">Recent Transfers</Typography>
          </Box>
        }
      />
      <Table>
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Sender</TableCell>
            <TableCell>Receiver</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((transfer: UserTransfer) => (
            <TableRow key={transfer.id} className="hover:bg-gray-50">
              {/* ID */}
              <TableCell sx={{ width: '50px' }}>
                #{transfer.id.substring(0, 6)}...
              </TableCell>

              {/* Sender */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={transfer.sender.avatar || ''}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {transfer.sender.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {transfer.sender.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              {/* Receiver */}
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={transfer.receiver.avatar || ''}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {transfer.receiver.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {transfer.receiver.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              {/* Amount */}
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                {CURRENCY_SYMBOL}{transfer.amount.toFixed(2)}
                </Typography>
              </TableCell>

              {/* Description */}
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {transfer.description || '--'}
                </Typography>
              </TableCell>

              {/* Date */}
              <TableCell>
                <Typography variant="body2">
                  {new Date(transfer.createdAt).toLocaleDateString()}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UsersTransfers;
