import { Box, Typography, Button, Divider, TextField } from '@mui/material';
import OrderItem from '../../components/extra/orderItem/orderitem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setDisplayCart } from '../../features/shoppingCart/shoppingCartSlice';
import { useRouter } from '@tanstack/react-router';

const OrderSummary = () => {
  const Router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { basePrice, vat, totalPrice } = useSelector(
    (state: RootState) => state.shoppingCart
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
      <Box className={' flex  flex-col gap-2 py-2'}>
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
        InputProps={{
          endAdornment: (
            <Button
              size="small"
              variant="outlined"
              className="text-[8px] w-[160px] !rounded-[4px]"
            >
              apply cupon
            </Button>
          ),
        }}
      />
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
