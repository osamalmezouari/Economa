import { Box, CircularProgress } from '@mui/material';
import HighlyRightedProductContainer from '../components/extra/HighlyRightedProductContainer/HighlyRightedProductContainer';
import TitleThree from '../components/extra/Titles/TitleThree';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const HighlyRightedProductSection = () => {
  const { loading, data } = useSelector(
    (state: RootState) => state.products.productsDetails
  );

  if (loading) {
    return (
      <Box className="w-full flex justify-center items-center py-8">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      {data.HighlyRighted.length ? (
        <>
          <TitleThree />
          <HighlyRightedProductContainer />
        </>
      ) : (
        ''
      )}
    </>
  );
};
export default HighlyRightedProductSection;
