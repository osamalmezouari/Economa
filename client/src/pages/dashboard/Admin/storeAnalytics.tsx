import { Button, Grid2 as Grid } from '@mui/material';
import WelcomeBanner from '../../../components/dashboards/shared/welcomebanner/welcomeBanner';
import { Link } from '@tanstack/react-router';
import { PiPlusBold } from 'react-icons/pi';
import HandWaveIcon from '../../../components/icons/hand-wave';
import StatCards from '../../../widgets/dashboards/Admin/stateCards';
import SalesXProfit from '../../../widgets/dashboards/Admin/SalesXProfit';
import SalesXProfitLastWeek from '../../../widgets/dashboards/Admin/SalesXProfitLastWeek';

const StoreAnalytics = () => {
  return (
    <Grid container>
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
        <Grid size={7}>
          <SalesXProfitLastWeek />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default StoreAnalytics;
