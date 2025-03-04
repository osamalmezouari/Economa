import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import BalanceCard from './balanceCard';
import { IoTrendingDown } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { BiWallet } from 'react-icons/bi';
import { placeandpay } from '../../features/order/orderThunk';
import { FormEvent } from 'react';
import { getshoppingCart } from '../../features/shoppingCart/shoppingCartThunk';

const OrderValidationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const totalPrice = useSelector(
    (state: RootState) => state.shoppingCart.totalPrice
  );
  const { loading, error, data } = useSelector(
    (state: RootState) => state.coupon.verifyCoupon
  );

  const { loading: balanceLoading, data: balanceData } = useSelector(
    (state: RootState) => {
      return state.balance.balanceCard;
    }
  );

  const { data: placeandpaydata, error: placeandpayerror } = useSelector(
    (state: RootState) => {
      return state.order.placeandpay;
    }
  );

  const Handlesubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      placeandpay({
        couponCode: data.code,
      })
    );
    if (placeandpaydata.orderId) {
      await dispatch(getshoppingCart());
    }
  };
  return (
    <Box>
      <Box className={'bg-primary-main p-4 rounded '}>
        <Typography variant="h5" color="white">
          {' '}
          Place & Pay the Order
        </Typography>
      </Box>
      <BalanceCard />
      <Box
        className={
          'bg-gray-100 p-2 items-center px-4 rounded mt-2 flex justify-between'
        }
      >
        <Typography variant="body2" className="!font-Inria ">
          This will cost you
        </Typography>
        <Button
          startIcon={!loading && <IoTrendingDown color="white" scale={3} />}
          className="!text-white !bg-red-500 !cursor-text"
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={16} sx={{ color: 'white' }} />
          ) : (
            ''
          )}
          {data.verified && !error && !loading
            ? data.discount_type === 'Percentage'
              ? (totalPrice - totalPrice * (data.discount_value / 100)).toFixed(
                  2
                ) + '$'
              : (totalPrice - data.discount_value).toFixed(2) + '$'
            : !loading
              ? totalPrice.toFixed(2) + '$'
              : ''}
        </Button>
      </Box>
      <Box
        className={
          'bg-gray-100 p-2 items-center px-4 rounded mt-2 flex justify-between'
        }
      >
        <Typography variant="body2" className="capitalize !font-Inria ">
          Remaining balance after purchase
        </Typography>
        <Button
          startIcon={!loading && <BiWallet color="white" scale={3} />}
          className="!text-white !cursor-text"
          color="primary"
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={16} sx={{ color: 'white' }} />
          ) : (
            ''
          )}
          {data.verified && !error && !balanceLoading && !loading
            ? data.discount_type === 'Percentage'
              ? (
                  balanceData.balance -
                  (totalPrice - totalPrice * (data.discount_value / 100))
                ).toFixed(2) + '$'
              : (
                  balanceData.balance -
                  (totalPrice - data.discount_value)
                ).toFixed(2) + '$'
            : !loading && balanceData.balance
              ? (balanceData.balance - totalPrice).toFixed(2) + '$'
              : ''}
          {}
        </Button>
      </Box>
      <Box component={'form'} onSubmit={(e: FormEvent) => Handlesubmit(e)}>
        <FormGroup className="px-2 my-2">
          <FormControlLabel
            required
            className="text-[12px]"
            control={<Checkbox />}
            label="I accept no cancellations or returns of money."
          />
        </FormGroup>
        {placeandpayerror && <Alert severity="info" className='my-2'>{placeandpayerror}</Alert>}
        <Button className="w-full" variant="outlined" type="submit">
          Pay and Place Order
        </Button>
        
      </Box>
    </Box>
  );
};
export default OrderValidationForm;
