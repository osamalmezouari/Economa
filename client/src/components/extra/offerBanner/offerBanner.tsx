import { Box } from '@mui/material';
import PromoCard from '../../base/PromoCard/PromoCard';

const OfferBanner = () => {
  return (
    <Box className=" max-w-[1350px] mt-16 m-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Box className="w-full">
        <PromoCard
          image={'/assets/images/storebanner1.jpg'}
          title={'Fresh Fruits'}
          subtitle={'Special flavor.'}
          discountText={'Limited time: 10% off!'}
          buttonText={'Shop now'}
        />
      </Box>
      <Box className="w-full">
        <PromoCard
          image={'/assets/images/storebanner2.jpg'}
          title={'Fastfood'}
          subtitle={'Healthy meal.'}
          discountText={'Limited time: 10% off!'}
          buttonText={'Shop now'}
        />
      </Box>
    </Box>
  );
};

export default OfferBanner;
