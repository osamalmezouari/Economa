import { Box, CircularProgress } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import TitleThree from './Titles/TitleThree';
import HighlyRightedProductContainer from './HighlyRightedProductContainer';


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
