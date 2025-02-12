import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import OrderItem from '../components/extra/orderItem/orderitem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { setDisplayCart } from '../features/shoppingCart/shoppingCartSlice';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { verfyCoupon } from '../features/coupon/couponThunk';
import { verfy_coupon_type } from '../types/coupon';

const OrderSummary = () => {
  const Router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [coupon, setcoupon] = useState<verfy_coupon_type>({
    code: '',
    orderAmountValue: 0,
  });
  const handleCouponChange = (e) => {
    setcoupon({
      ...coupon,
      code: e.target.value,
    });
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
        className={' flex  flex-col  py-2 h-[323px] px-2   overflow-y-scroll'}
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
        helperText={
          data.verified && !error ? (
            <p className="text-primary-main">
              {` - ${data.discount_value} ${data.discount_type === 'Percentage' ? '%' : '$'} discount was
              applied `}
            </p>
          ) : (
            ''
          )
        }
        InputProps={{
          endAdornment: (
            <Button
              size="small"
              variant="outlined"
              className="text-[12px] w-[180px] !rounded-[4px]"
              disabled={loading}
              onClick={async () => {
                console.log({
                  code: coupon.code,
                  orderAmountValue: totalPrice,
                });
                await dispatch(
                  verfyCoupon({
                    code: coupon.code,
                    orderAmountValue: totalPrice,
                  })
                );
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
      {error && <Alert severity="info">{error}</Alert>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="body2" fontWeight="bold">
          Total
        </Typography>
        {data.verified && !error && !loading ? (
          data.discount_type === 'Percentage' ? (
            <Typography className="flex gap-5">
              <Typography variant="body2" className="line-through ">
                ${totalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {'$' +
                  (
                    totalPrice -
                    totalPrice * (data.discount_value / 100)
                  ).toFixed(2)}
              </Typography>
            </Typography>
          ) : (
            <Typography className="flex gap-5">
              <Typography
                variant="body2"
                fontWeight="bold"
                className="line-through "
              >
                ${totalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {'$' + (totalPrice - data.discount_value).toFixed(2)}
              </Typography>
            </Typography>
          )
        ) : !loading ? (
          <Typography variant="body2">${totalPrice.toFixed(2)}</Typography>
        ) : (
          ''
        )}
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={() => Router.navigate({ to: '/Economa/Store' })}
      >
        Back to Store
      </Button>
    </Box>
  );
};

export default OrderSummary;
