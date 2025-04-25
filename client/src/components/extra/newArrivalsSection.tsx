import { Box } from '@mui/material';
import ProductnewArrivalsContainer from './productnewArrivalsContainer';
import HeroTitle from './Titles/HeroTitle';

const NewArrivalsSection = () => {
  return (
    <Box>
      <HeroTitle
        title={'New Arrivals'}
        subtitle={'Shop online for new arrivals and get free shipping!'}
      />
      <ProductnewArrivalsContainer />
    </Box>
  );
};

export default NewArrivalsSection;
