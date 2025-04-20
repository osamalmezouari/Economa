import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Avatar,
  Chip,
  Divider,
  Grid,
  CircularProgress,
} from '@mui/material';
import PageHeader from '../../base/pageheader/PageHeader';
import QRCodeScanner from './QRCodeScanner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { getOrderById } from '../../../../features/order/orderThunk';
import { FaCheckCircle, FaRegClock, FaShoppingBag } from 'react-icons/fa';
import { format } from 'date-fns';
import DateCell from '../../base/dateCell';
import { IoBagHandleOutline } from 'react-icons/io5';

const OrderVerification: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: orderDetails,
    loading,
    error,
  } = useSelector((state: RootState) => state.order.OrderById);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = async (result: string) => {
    setScanResult(result);
    await dispatch(getOrderById(result));
  };

  return (
    <Box className="p-4 mt-16">
      <PageHeader
        title="Order Verification"
        breadcrumb={[
          { name: 'Dashboard', href: '/Economa/admin/dashboard' },
          { name: 'Tools' },
          { name: 'Order Verification' },
        ]}
      />

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Box>
          <QRCodeScanner onScan={handleScan} />
        </Box>

        <Box>
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          {orderDetails && orderDetails.id && !loading && (
            <Paper elevation={3} className="p-6 rounded-sm shadow-sm">
              {/* Receipt Header */}
              <Box className="flex items-center justify-between mb-4">
                <Box className="flex items-center">
                  <Avatar
                    src={orderDetails.user?.avatar || ''}
                    alt={orderDetails.user?.name || 'Customer'}
                    className="mr-3"
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography variant="h6" className="font-semibold">
                      {orderDetails.user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {orderDetails.user?.email || 'No email provided'}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={orderDetails.status}
                  
                  color={
                    orderDetails.status === 'Completed' ? 'success' : 'primary'
                  }
                  icon={
                    orderDetails.status === 'Completed' ? (
                      <FaCheckCircle />
                    ) : (
                      <FaRegClock />
                    )
                  }
                  className="font-medium rounded-[2px]"
                />
              </Box>

              {/* Order Info */}
              <Box className="bg-gray-50 p-4 rounded-lg mb-4">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Order ID
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      {orderDetails.id.substring(0, 8)}...
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      <DateCell date={orderDetails.createdAt} />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Items Section */}
              <Typography
                variant="subtitle1"
                className="font-semibold mb-3 flex items-center"
              >
                <IoBagHandleOutline className="mr-2" /> Products
              </Typography>

              <Box className="mb-4">
                {orderDetails?.orderItems?.map((item: any, index: number) => (
                  <Box
                    key={index}
                    className="flex items-center py-3 border-b last:border-b-0"
                  >
                    <Box className="w-18 h-18  rounded-md flex items-center justify-center mr-3">
                      <Avatar
                        src={item.product.gallery[0].imageUrl}
                        alt={item.product.name}
                        
                        className="w-16 h-16 object-contain"
                      />
                    </Box>
                    <Box className="flex-grow">
                      <Typography variant="body1" className="font-medium">
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.product.Units.name}
                      </Typography>
                    </Box>
                    <Box className="text-right">
                      <Typography variant="body2" className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.product.price} × {item.quantity}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Total Section */}
              <Divider className="mb-4" />
              <Box className="flex justify-between items-center">
                <Typography variant="subtitle1" className="font-semibold">
                  Total Amount
                </Typography>
                <Typography
                  variant="h6"
                  className="font-bold text-primary-main"
                >
                  ${orderDetails.totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          )}

          {!orderDetails?.id && !error && scanResult && (
            <Box className="flex justify-center items-center h-full">
              <Typography variant="body1">
                <CircularProgress color="primary" />.
              </Typography>
            </Box>
          )}

          {!orderDetails?.id && !error && !scanResult && (
            <Box className="flex justify-center items-center h-full">
              <Typography variant="body1" className="text-gray-500">
                Scan a QR code to view order details
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderVerification;
