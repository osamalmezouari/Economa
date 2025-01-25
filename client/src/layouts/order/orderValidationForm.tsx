import {
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import BalanceCard from '../../components/extra/balanceCard/balanceCard';
import { IoTrendingDown } from 'react-icons/io5';

const OrderValidationForm = () => {
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
        <Chip
          icon={<IoTrendingDown color="white" scale={3} />}
          label={'- $50'}
          className="!text-white !bg-red-500 w-[100px] !rounded "
        />
      </Box>
      <Box
        className={
          'bg-gray-100 p-2 items-center px-4 rounded mt-2 flex justify-between'
        }
      >
        <Typography variant="body2" className="capitalize !font-Inria ">
          Remaining balance after purchase
        </Typography>
        <Chip
          label={'$950'}
          className="!text-white !bg-primary-main w-[100px] !rounded "
        />
      </Box>
      <FormGroup className="px-2 my-2">
        <FormControlLabel
          required
          className="text-[12px]"
          control={<Checkbox />}
          label="I accept no cancellations or returns of money."
        />
      </FormGroup>
      <Button className="w-full" variant="outlined">
        Pay and Place Order
      </Button>
    </Box>
  );
};
export default OrderValidationForm;
