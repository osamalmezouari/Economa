import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import EmptyBox from '../../components/base/empty-box/empty-box';
import OrderItem from '../../components/extra/orderItem/orderitem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { setDisplayCart } from '../../features/shoppingCart/shoppingCartSlice';

const OrderSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      <Box className={'flex items-center justify-center py-2'}>
        {/* <EmptyBox /> */}
        <OrderItem />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
        <Typography variant="body2">Subtotal</Typography>
        <Typography variant="body2">$0.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Tax</Typography>
        <Typography variant="body2">$0.00</Typography>
      </Box>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        className="!mb-2"
        InputProps={{
          endAdornment: (
            <Button size="small" className="text-[8px] w-full ">
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
          $0.00
        </Typography>
      </Box>
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        Back to Store
      </Button>
    </Box>
  );
};

export default OrderSummary;
