import { Grid2 as Grid } from '@mui/material';
import RefillDaily from '../../components/admin/extra/overview/Refill Insights/RefillDaily';
import UsersTransfers from '../../components/admin/extra/overview/Refill Insights/usertransfers';
import RefillStatCard from '../../components/admin/extra/overview/Refill Insights/refillStatCard';
import RefillYearlyChart from '../../components/admin/extra/overview/Refill Insights/refillYearlychart';

const RefillInsights = () => {
  return (
    <Grid container className={'mt-16'}>
      <Grid size={12} className={'px-2'}>
        <RefillStatCard />
      </Grid>
      <Grid size={12} className={'px-2 mt-6'}>
        <RefillYearlyChart />
      </Grid>
      <Grid size={12} className={'px-2 mt-6'}>
        <RefillDaily />
      </Grid>
      <Grid size={12} className={'px-2 mt-6'}>
        <UsersTransfers />
      </Grid>
    </Grid>
  );
};
export default RefillInsights;
