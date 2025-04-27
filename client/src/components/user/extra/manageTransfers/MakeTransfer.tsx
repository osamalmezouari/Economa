import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import {
  getbalanceCardInfo,
  getUserTransfers,
  makeTransfer,
} from '../../../../features/balance/balanceThunk';
import { TransferRequest } from '../../../../types/balance';
import { CURRENCY_SYMBOL } from '../../../../utils/constants';
import DateCell from '../../../admin/base/dateCell';

const MakeTransferComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: balanceData, loading: balanceLoading } = useSelector(
    (state: RootState) => state.balance.balanceCard
  );
  const { data: data, loading: transfersLoading } = useSelector(
    (state: RootState) => state.balance.userTransfers
  );
  const { loading: transferRequestLoading, error: transferError } = useSelector(
    (state: RootState) => state.balance.transferRequest
  );

  const [formData, setFormData] = useState<TransferRequest>({
    receiverEmail: '',
    amount: 0,
    description: '',
    reqStatus: { statusCode: null, message: null },
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(getbalanceCardInfo());
    dispatch(getUserTransfers());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    // Simple validation check
    const isValid =
      formData.receiverEmail &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receiverEmail) &&
      formData.amount > 20;

    if (isValid) {
      try {
        await dispatch(makeTransfer(formData)).unwrap();
        setSuccessMessage('Transfer completed successfully!');
        setFormData({
          receiverEmail: '',
          amount: 0,
          description: '',
          reqStatus: { statusCode: null, message: null },
        });
        // Refresh balance and transfers
        await dispatch(getbalanceCardInfo());
        await dispatch(getUserTransfers());
      } catch (error) {
        console.error('Transfer failed:', error);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Transfer Form */}
      <Grid item xs={12} md={5} xl={4}>
        <Card className="shadow-sm border-[1px] rounded-md">
          <CardHeader
            title="Make a Transfer"
            subheader={`Available Balance: ${CURRENCY_SYMBOL}${balanceData.balance.toFixed(2)}`}
          />
          <Divider className="mt-2" />
          <CardContent>
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            {transferError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {transferError}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Receiver Email"
                name="receiverEmail"
                value={formData.receiverEmail}
                onChange={handleChange}
                margin="normal"
                required
                error={
                  !formData.receiverEmail ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receiverEmail)
                }
                helperText={
                  !formData.receiverEmail
                    ? 'Receiver email is required'
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receiverEmail)
                      ? 'Invalid email format'
                      : ''
                }
                disabled={transferRequestLoading}
              />
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount || ''}
                onChange={handleChange}
                margin="normal"
                required
                error={!formData.amount || formData.amount <= 20}
                helperText={
                  !formData.amount
                    ? 'Amount is required'
                    : formData.amount <= 20
                      ? 'Amount must be greater than 20'
                      : ''
                }
                disabled={transferRequestLoading}
                InputProps={{
                  startAdornment: (
                    <Typography className="mr-2">{CURRENCY_SYMBOL} </Typography>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Description (Optional)"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                disabled={transferRequestLoading}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={transferRequestLoading || balanceLoading}
              >
                {transferRequestLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Send Money'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Transfers History */}
      <Grid item xs={12} md={7} xl={8}>
        <Card className="shadow-sm border-[1px] rounded-md">
          <CardHeader title="Transfer History" />
          <Divider className="mt-8" />
          {transfersLoading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : data && data?.transfers?.length > 0 ? (
            <Table>
              <TableHead className="bg-secondary-main">
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>Sender</TableCell>
                  <TableCell>Receiver</TableCell>
                  <TableCell>Amount</TableCell>
                  {/*<TableCell>Description</TableCell>*/}
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.transfers.map((transfer) => (
                  <TableRow key={transfer.id} className="hover:bg-gray-50">
                    {/* ID */}
                    {/* <TableCell sx={{ width: '50px' }}>
                      #{transfer.id.substring(0, 6)}...
                    </TableCell> */}
                    {/* senter*/}
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
                        {CURRENCY_SYMBOL}
                        {transfer.amount.toFixed(2)}
                      </Typography>
                    </TableCell>

                    {/* Description */}
                    {/* <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {transfer.description || '--'}
                      </Typography>
                    </TableCell> */}

                    {/* Date */}
                    <TableCell>
                      <Typography variant="body2">
                        <DateCell date={transfer.createdAt} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box p={3} textAlign="center">
              <Typography variant="body1" color="text.secondary">
                No transfers found
              </Typography>
            </Box>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default MakeTransferComponent;
