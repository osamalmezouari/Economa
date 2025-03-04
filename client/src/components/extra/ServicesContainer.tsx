import { Box } from '@mui/material';
import { TbCircleDashedPercentage, TbTruckDelivery } from 'react-icons/tb';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import ServiceCard from '../base/service-card/ServiceCard';

const ServicesContainer = () => {
  return (
    <Box
      className={'max-w-[1350px] p-2 flex gap-4 m-auto justify-around my-12'}
    >
      <ServiceCard
        icon={
          <TbTruckDelivery className="w-12 my-2 h-12 font-light m-auto text-primary-main" />
        }
        title={'Free Shipping'}
        subtitle={'Free on US orders over $200'}
      />
      <ServiceCard
        icon={<BiSupport className="w-20 h-12 my-2 m-auto text-primary-main" />}
        title={'24/7 Support'}
        subtitle={'Available around the clock'}
      />
      <ServiceCard
        icon={
          <TbCircleDashedPercentage className="w-20 h-12 my-2 m-auto text-primary-main" />
        }
        title={'30-Day Returns'}
        subtitle={'Easy returns within 30 days'}
      />
      <ServiceCard
        icon={
          <RiMoneyDollarCircleLine className="w-20 h-12 my-2 m-auto text-primary-main" />
        }
        title={'Secure Payments'}
        subtitle={'Your transactions are protected'}
      />
    </Box>
  );
};

export default ServicesContainer;
