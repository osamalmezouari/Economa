import { Grid } from '@mui/material';
import OrderValidationForm from '../layouts/order/orderValidationForm';
import OrderSummary from '../layouts/order/orderSummary';

const Order = () => {
  return (
    <Grid
      container
      maxWidth={'lg'}
      justifyContent={'center'}
      marginX={'auto'}
      marginY={8}
      gap={4}
    >
      <Grid item lg={4}>
        <OrderValidationForm />
      </Grid>
      <Grid item lg={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
};
export default Order;
