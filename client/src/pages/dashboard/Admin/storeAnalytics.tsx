import { Button, Grid2 as Grid } from '@mui/material';
import WelcomeBanner from '../../../components/dashboards/shared/welcomebanner/welcomeBanner';
import { Link } from '@tanstack/react-router';
import { PiPlusBold } from 'react-icons/pi';
import HandWaveIcon from '../../../components/icons/hand-wave';
import StatCards from '../../../widgets/dashboards/Admin/stateCards';
import SalesXProfit from '../../../widgets/dashboards/Admin/SalesXProfit';
import CostXProfitLastWeek from '../../../widgets/dashboards/Admin/CostXProfitLastWeek';
import CategorySales from '../../../widgets/dashboards/Admin/CategorySales';
import TopProducts from '../../../widgets/dashboards/Admin/TopProducts';
import TopCostumers from '../../../widgets/dashboards/Admin/TopCostumers';
import StockReport from '../../../widgets/dashboards/Admin/StockReport';

const StoreAnalytics = () => {
  return (
    <Grid container className={'mt-16'}>
      <Grid size={12} className={'px-4'}>
        <WelcomeBanner
          title={
            <>
              Good Morning, <br /> Cameron
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            'Here’s What happening on your store today. See the statistics at once.'
          }
          media={
            <div className="block -top-12 end-4  @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <img
                  className="h-[220px] w-[220px] ml-[30%] scale-[1.5]"
                  alt="freepik assets"
                  src={'/assets/images/shop-illustration.png'}
                />
              </div>
            </div>
          }
        >
          <Link href={''} className="inline-flex">
            <Button
              variant="contained"
              size="medium"
              className="h-[38px] shadow md:h-10"
            >
              <PiPlusBold className="me-1 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </WelcomeBanner>
        <Grid size={12}>
          <StatCards className="@2xl:grid-cols-3 mt-6 grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />
        </Grid>
        <Grid size={12}>
          <SalesXProfit className="@4xl:col-span-2 @7xl:col-span-8 mt-6" />
        </Grid>
        <Grid size={12} container spacing={2}>
          <Grid size={6}>
            <CostXProfitLastWeek />
          </Grid>
          <Grid size={6}>
            <TopProducts />
          </Grid>
        </Grid>
        <Grid container size={12} spacing={2}>
          <Grid size={6}>
            <TopCostumers />
          </Grid>
          <Grid size={6}>
            <CategorySales />
          </Grid>
        </Grid>
        <Grid size={12}>
          <StockReport />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default StoreAnalytics;
