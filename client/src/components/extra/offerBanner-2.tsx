import { Box } from '@mui/material';
import PromoCardtoptitle from '../base/PromoCard/PromoCard-TT';

const OfferBanner2 = () => {
  return (
    <Box className=" max-w-[1300px] mt-4 m-auto grid grid-cols-4 gap-8 h-[400px]">
      <Box className="w-full">
        <PromoCardtoptitle
          image={'/assets/images/banner-04.jpg'}
          title={'We are here for shopping lovers'}
          subtitle={'Special flavor.'}
          discountText={'5% Only this Week'}
          buttonText={'Shop now'}
        />
      </Box>
      <Box className="w-full">
        <PromoCardtoptitle
          image={'/assets/images/banner-05.jpg'}
          title={'Get pocket products with us'}
          subtitle={'Healthy meal.'}
          discountText={'20% Only this Week'}
          buttonText={'Shop now'}
        />
      </Box>
      <Box className="w-full">
        <PromoCardtoptitle
          image={'/assets/images/banner-06.jpg'}
          title={'Grocery store at the center  city'}
          subtitle={'Healthy meal.'}
          discountText={'15% Only this Week'}
          buttonText={'Shop now'}
        />
      </Box>
      <Box className="w-full">
        <PromoCardtoptitle
          image={'/assets/images/banner-07.jpg'}
          title={'Grocery store at the center  city'}
          subtitle={'Healthy meal.'}
          discountText={'25% Only this Week'}
          buttonText={'Shop now'}
        />
      </Box>
    </Box>
  );
};

export default OfferBanner2;
