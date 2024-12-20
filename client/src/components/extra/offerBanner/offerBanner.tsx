import { Box } from '@mui/material';
import PromoCard from '../../base/PromoCard/PromoCard';

const OfferBanner = () => {
  return (
    <Box className="w-[1200px] m-auto" component={'div'}>
    <PromoCard image={'https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/images/offerbanner.png?raw=true'} title={''} subtitle={''} discountText={''} buttonText={'none'} />

    </Box>
  );
};

export default OfferBanner;
