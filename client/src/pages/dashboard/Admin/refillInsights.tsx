import { Grid2 as Grid } from '@mui/material';
import RefillStatCard from '../../../components/dashboards/AdminDashboard/refillStatCard';
import RefillYearlyChart from '../../../components/dashboards/AdminDashboard/refillYearlychart';

const RefillInsights = () => {
  return (
    <Grid container className={'mt-16'}>
      <Grid size={12} className={'px-2'}>
        <RefillStatCard />
      </Grid>
      <Grid size={12} className={'px-2 mt-6'}>
        <RefillYearlyChart />
      </Grid>
    </Grid>
  );
};
export default RefillInsights;
