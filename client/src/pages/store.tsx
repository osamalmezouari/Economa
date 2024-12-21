import { Grid } from '@mui/material';
import StoreTopSection from '../components/extra/StoreTopSection/StoreTopSection.tsx';
import LeftStoreFilter from '../layouts/leftStoreFilter.tsx';
import TopStoreFilter from '../layouts/topStoreFilter.tsx';

const Store = () => {
    return <>
        <StoreTopSection />
        <Grid container gap={2} maxWidth={1200} sx={{ margin: 'auto' }}>
            <LeftStoreFilter />
            <Grid item lg={8.5} sx={{ marginTop: '20px', paddingTop: '0px' }}>
                <TopStoreFilter />

            </Grid>
        </Grid>
    </>;
};
export default Store;