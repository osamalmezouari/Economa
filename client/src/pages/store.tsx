import { Box, Grid } from '@mui/material';
import StoreTopSection from '../components/extra/StoreTopSection.tsx';
import LeftStoreFilter from '../components/extra/leftStoreFilter.tsx';
import TopStoreFilter from '../components/extra/topStoreFilter.tsx';
import StoreProducts from '../components/extra/storeProducts.tsx';

const Store = () => {
  return (
    <Box maxWidth={1350} className={'m-auto'}>
      <StoreTopSection />
      <Grid container gap={1} sx={{ margin: 'auto' }}>
        <LeftStoreFilter />
        <Grid item lg={8.5} sx={{ marginTop: '20px', paddingTop: '0px' }}>
          <TopStoreFilter />
          <StoreProducts />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Store;
