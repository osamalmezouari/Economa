import { Box } from '@mui/material';
import ServiceCard from '../base/service-card/ServiceCard';
import PaymentDocument from '../icons/payment';
import Discount from '../icons/discount';
import Quality from '../icons/quality';
import Dilevry from '../icons/dilevery';

const ServicesContainer = () => {
  return (
    <Box className={'max-w-[1300px] flex justify-between gap-6 m-auto  my-12'}>
      <ServiceCard
        icon={<PaymentDocument className="w-12  h-12 my-2" />}
        title={'Secure Balance System'}
        subtitle={
          'Transfer money to our account and shop with your balance securely'
        }
      />
      <ServiceCard
        icon={<Discount className="w-12 h-12 my-2 " />}
        title={'QR Code Verification'}
        subtitle={
          'Unique QR codes for easy verification at checkout or delivery'
        }
      />
      <ServiceCard
        icon={<Quality className="w-12 h-12 my-2 " />}
        title={'Quality Assurance'}
        subtitle={
          'Products verified at pickup or delivery to ensure order accuracy'
        }
      />
      <ServiceCard
        icon={<Dilevry className="w-12 h-12 my-2" />}
        title={'Flexible Pickup & Delivery'}
        subtitle={
          'In-store pickup or home delivery with verified service'
        }
      />
    </Box>
  );
};

export default ServicesContainer;
