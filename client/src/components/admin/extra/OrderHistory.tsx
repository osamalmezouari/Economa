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
import { AppDispatch, RootState } from '../../../app/store';
import { useEffect, useState } from 'react';
import DateCell from '../base/dateCell';

import { Order } from '../../../types/order';
import { getOrdersHistory } from '../../../features/order/orderThunk';
import { BiSearch } from 'react-icons/bi';

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector(
    (state: RootState) => state.order.OrdersHistory
  );
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

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
    dispatch(getOrdersHistory({ page: 1, email: search }));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getOrdersHistory({ page: currentPage, email: search }));
  }, [currentPage, dispatch]);

  return (
    <>
      <TextField
        className="w-[250px]"
        variant="outlined"
        fullWidth
        size="small"
        name="search"
        placeholder="Search by email"
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
      <Table className="mt-6 ">
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell className="py-2 h-6">ID</TableCell>
            <TableCell className="py-2 h-6">Customer</TableCell>
            <TableCell className="py-2 h-6">Amount</TableCell>
            <TableCell className="py-2 h-6">Status</TableCell>
            <TableCell className="py-2 h-6">Products</TableCell>{' '}
            <TableCell className="py-2 h-6">Created At</TableCell>
            <TableCell className="py-2 h-6">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.orders.map((order: Order, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Typography className="text-[12px]">
                  {order.id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={order.user.avatar}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      className="text-[14px] font-medium"
                    >
                      {order.user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-[12px] text-gray-500"
                    >
                      {order.user.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  ${order.totalAmount.toFixed(2)}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  {order.status}
                </Typography>
              </TableCell>
              <TableCell className="min-w-[200px]">
                {order.orderItems.slice(0, 1).map((item, i) => (
                  <Box key={i} display="flex" className="w-full" gap={1}>
                    <Avatar
                      src={item.product.gallery[0]?.imageUrl}
                      alt={item.product.name}
                      sx={{ width: 30, height: 30 }}
                      variant="rounded"
                    />
                    <Box>
                      <Typography variant="body2" className="text-[12px]">
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" className="text-[12px]">
                        {item.quantity} - {item.product.Units.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                {order.orderItems.length > 1 && (
                  <Box>
                    <Typography
                      variant="body2"
                      className="text-[12px] float-left text-primary-main underline cursor-pointer hover:opacity-80"
                      onClick={() => {
                        const updatedOrders = [...expandedOrders];
                        if (updatedOrders.includes(order.id)) {
                          setExpandedOrders(
                            updatedOrders.filter((id) => id !== order.id)
                          );
                        } else {
                          updatedOrders.push(order.id);
                          setExpandedOrders(updatedOrders);
                        }
                      }}
                    >
                      {expandedOrders.includes(order.id)
                        ? 'Show less'
                        : `+${order.orderItems.length - 1} more`}
                    </Typography>
                    {expandedOrders.includes(order.id) &&
                      order.orderItems.slice(1).map((item, i) => (
                        <Box
                          key={`extra-${i}`}
                          display="flex"
                          className="w-full"
                          gap={1}
                          mt={1}
                        >
                          <Avatar
                            src={item.product.gallery[0]?.imageUrl}
                            alt={item.product.name}
                            sx={{ width: 30, height: 30 }}
                            variant="rounded"
                          />
                          <Box>
                            <Typography variant="body2" className="text-[12px]">
                              {item.product.name}
                            </Typography>
                            <Typography variant="body2" className="text-[12px]">
                              {item.quantity} - {item.product.Units.name}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                )}
              </TableCell>
              <TableCell className="min-w-[250px]">
                <Typography variant="body2" className="text-[12px]">
                  <DateCell date={order.createdAt} />
                </Typography>
              </TableCell>
              <TableCell className="min-w-[250px]">
                <Typography variant="body2" className="text-[12px]">
                  <DateCell date={order.updatedAt} />
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

export default OrderHistory;
