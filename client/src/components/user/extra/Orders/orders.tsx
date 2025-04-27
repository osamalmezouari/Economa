import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { useEffect, useState } from 'react';
import DateCell from '../../../admin/base/dateCell';
import { Order } from '../../../../types/order';
import { getUserOrders } from '../../../../features/order/orderThunk';
import QRCodeGenerator from '../../../base/QRCodeGenerator';
import { CURRENCY_SYMBOL } from '../../../../utils/constants';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector(
    (state: RootState) => state.order.UserOrders
  );
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getUserOrders({ page: currentPage }));
  }, [currentPage, dispatch]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-40">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Table className="mt-6">
        <TableHead className="bg-secondary-main">
          <TableRow>
            <TableCell className="py-2 h-6">Order ID</TableCell>
            <TableCell className="py-2 h-6">Amount</TableCell>
            <TableCell className="py-2 h-6">Status</TableCell>
            <TableCell className="py-2 h-6">Products</TableCell>
            <TableCell className="py-2 h-6">Date</TableCell>
            <TableCell className="py-2 h-6">QR Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.orders?.map((order: Order, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Typography className="text-[12px]">
                  {order.id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                {CURRENCY_SYMBOL}{order.totalAmount.toFixed(2)}
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
              <TableCell>
                <Typography variant="body2" className="text-[12px]">
                  <DateCell date={order.createdAt} />
                </Typography>
              </TableCell>
              <TableCell>
                <Tooltip title="View QR Code">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setQrModalOpen(true);
                    }}
                  >
                    <QrCodeIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data?.pageCount > 1 && (
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
      )}

      {/* QR Code Modal */}
      <QRCodeGenerator
        orderId={selectedOrderId}
        open={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
      />
    </>
  );
};

export default Orders;
