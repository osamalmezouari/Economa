import { Box, Grid, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OrderValidationForm from '../components/extra/orderValidationForm';
import OrderSummary from '../components/extra/orderSummary';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import QRCodeGenerator from '../components/base/QRCodeGenerator';
import { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { getshoppingCart } from '../features/shoppingCart/shoppingCartThunk';
import { clearOrderId } from '../features/order/orderSlice';

const Order = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.order.placeandpay
  );
  const router = useRouter();
  const [openQrDialog, setOpenQrDialog] = useState(false);

  const handleCloseQrDialog = async () => {
    router.navigate({ to: '/Economa/Store' });
    dispatch(clearOrderId());
    setOpenQrDialog(false);
    await dispatch(getshoppingCart());
  };

  useEffect(() => {
    if (data?.orderId) {
      setOpenQrDialog(true);
    }
  }, [data?.orderId]);

  return (
    <Grid
      container
      maxWidth={'lg'}
      justifyContent={'center'}
      marginX={'auto'}
      marginY={8}
      gap={4}
      className="relative"
    >
      <>
        <Grid item lg={4} className={`${loading ? '!opacity-[0.6]' : ''}`}>
          <OrderValidationForm />
        </Grid>
        <Grid item lg={4} className={`${loading ? '!opacity-[0.6]' : ''}`}>
          <OrderSummary />
        </Grid>
      </>

      {/* Loading Screen */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <video
            muted
            playsInline
            src="/assets/illustrations/animated/qr-code-animated.mp4"
            autoPlay
            loop
            style={{ maxWidth: '250px', maxHeight: '250px' }}
          />
        </Box>
      )}

      {/* QR Code Dialog */}
      {!loading && data.orderId && (
        <Dialog open={openQrDialog} onClose={handleCloseQrDialog}>
          <Box sx={{ position: 'relative', padding: 6 }}>
            <IconButton
              onClick={handleCloseQrDialog}
              sx={{ position: 'absolute', top: 8, right: 8 }}
              className="!hover:bg-red-400"
            >
              <CloseIcon />
            </IconButton>
            <QRCodeGenerator orderId={data.orderId} />
          </Box>
        </Dialog>
      )}
    </Grid>
  );
};

export default Order;
