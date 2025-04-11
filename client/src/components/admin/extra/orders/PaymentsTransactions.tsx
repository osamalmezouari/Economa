import {
  Avatar,
  Box,
  CircularProgress,
  InputAdornment,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { useEffect, useState } from 'react';
import DateCell from '../../base/dateCell';
import { BiSearch } from 'react-icons/bi';
import { getPaymentTransactions } from '../../../../features/payments/paymentThunk';
import { PaymentTransactionType } from '../../../../types/payments';

const PaymentTransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector(
    (state: RootState) => state.payments.Transactions
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    dispatch(getPaymentTransactions({ page: 1, search }));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getPaymentTransactions({ page: currentPage, search }));
  }, [currentPage, dispatch]);

  return (
    <>
      <TextField
        className="w-[250px]"
        variant="outlined"
        fullWidth
        size="small"
        name="search"
        placeholder="Search by name email or order ID"
        value={search}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading ? (
                <CircularProgress color="primary" size={15} />
              ) : (
                <BiSearch
                  onClick={handleSearch}
                  className="hover:bg-primary-main rounded-full w-6 h-6 border-8 bg-secondary-main text-white transition-all duration-500 ease-in-out cursor-pointer hover:text-white border-secondary-main hover:border-primary-main"
                />
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-input::placeholder': {
            fontSize: '12px',
          },
        }}
      />
      <Table className="mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell className="py-2 h-6">Payment ID</TableCell>
            <TableCell className="py-2 h-6">Customer</TableCell>
            <TableCell className="py-2 h-6">Order ID</TableCell>
            <TableCell className="py-2 h-6">Amount</TableCell>
            {/* <TableCell className="py-2 h-6">Status</TableCell> */}
            <TableCell className="py-2 h-6">Payment Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.payments.map((payment: PaymentTransactionType, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Typography className="text-[12px]">
                  {payment.id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={payment.order.user.avatar}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {payment.order.user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {payment.order.user.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {payment.orderId}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  ${payment.amount.toFixed(2)}
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="body2" className="text-[12px] capitalize">
                  {payment.paymentStatus}
                </Typography>
              </TableCell> */}
              <TableCell className="min-w-[250px]">
                <Typography variant="body2" className="text-[12px]">
                  <DateCell date={payment.paymentDate} />
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className="flex">
        <Pagination
          className="p-4 ml-auto"
          count={data.pageCount}
          color="primary"
          variant="outlined"
          page={currentPage}
          onChange={handlePageChange}
          disabled={loading}
        />
      </Box>
    </>
  );
};

export default PaymentTransactionTable;
