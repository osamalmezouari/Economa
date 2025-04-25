import { Box } from '@mui/material';
import PromoCardlefttitle from '../base/PromoCard/PromoCard-LT';

const OfferBanner = () => {
  return (
    <Box className=" max-w-[1300px] mt-4 m-auto grid grid-cols-3 gap-8 h-full">
      <Box className="w-full">
        <PromoCardlefttitle
          image={'/assets/images/banner-01.jpg'}
          title={'We are here for shopping lovers'}
          subtitle={'Special flavor.'}
          discountText={'Only this Week'}
          buttonText={'Shop now'}
        />
      </Box>
      <Box className="w-full">
        <PromoCardlefttitle
          image={'/assets/images/banner-02.jpg'}
          title={'Get pocket products with us'}
          subtitle={'Healthy meal.'}
          discountText={'Only this Week'}
          buttonText={'Shop now'}
        />
      </Box>
      <Box className="w-full">
        <PromoCardlefttitle
          image={'/assets/images/banner-03.jpg'}
          title={'Grocery store at the center  city'}
          subtitle={'Healthy meal.'}
          discountText={'Only this Week'}
          buttonText={'Shop now'}
        />
      </Box>
    </Box>
  );
};

export default OfferBanner;
