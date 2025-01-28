import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import OrderItem from '../../components/extra/orderItem/orderitem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setDisplayCart } from '../../features/shoppingCart/shoppingCartSlice';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { verfyCoupon } from '../../features/coupon/couponThunk';
import { ApiError } from '../../types/apierror';

const OrderSummary = () => {
  const Router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [coupon, setcoupon] = useState({
    code: '',
  });
  const handleCouponChange = (e) => {
    setcoupon(e.target.value);
    console.log(coupon);
  };
  const { basePrice, vat, totalPrice } = useSelector(
    (state: RootState) => state.shoppingCart
  );
  const { loading, error, data } = useSelector(
    (state: RootState) => state.coupon.verifyCoupon
  );
  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 1,
        maxWidth: '350px',
      }}
      component={'div'}
    >
      <Box className={'flex justify-between py-2 mb-4'}>
        <Typography
          variant="body2"
          className="!text-secondary-main capitalize tracking-widest"
          color="text.secondary.light"
        >
          Order items
        </Typography>
        <Typography
          className={'!underline cursor-pointer'}
          color="primary.main"
          variant="body2"
          onClick={() => {
            dispatch({ type: 'setDisplayWishlist', payload: false });
            dispatch(setDisplayCart());
          }}
        >
          Edit Cart
        </Typography>
      </Box>
      <Divider />
      <Box
        className={
          ' flex  flex-col gap-2 py-2 h-[323px] px-2   overflow-y-scroll'
        }
      >
        <OrderItem />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
        <Typography variant="body2">Base Price</Typography>
        <Typography variant="body2">${basePrice.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Tax</Typography>
        <Typography variant="body2">${vat.toFixed(2)}</Typography>
      </Box>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        className="!mb-2"
        value={coupon.code}
        onChange={handleCouponChange}
        error={data.verfied}
        helperText={data.verfied ? 'token was applied' : ''}
        InputProps={{
          endAdornment: (
            <Button
              size="small"
              variant="outlined"
              className="text-[8px] w-[180px] !rounded-[4px]"
              disabled={loading}
              onClick={async () => {
                await dispatch(verfyCoupon(coupon));
              }}
            >
              {loading ? (
                <CircularProgress color="primary" size={10} />
              ) : (
                'apply coupon'
              )}
            </Button>
          ),
        }}
      />
      {(error as ApiError) && (
        <Alert severity="info">{(error as ApiError).message}</Alert>
      )}
      {data.verfied && (
        <Alert security="info">coupon is was applied succufuly</Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => Router.navigate({ to: '/Store' })}
      >
        Back to Store
      </Button>
    </Box>
  );
};

export default OrderSummary;
