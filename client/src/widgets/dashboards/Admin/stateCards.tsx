import MetricCard from '../../../components/dashboards/AdminDashboard/metric-card';
import cn from '../../../utils/class-names';
import {
  PiCaretDoubleUpDuotone,
  PiCaretDoubleDownDuotone,
  PiGiftDuotone,
  PiChartPieSliceDuotone,
  PiBankDuotone,
} from 'react-icons/pi';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { useEffect } from 'react';
import { getCardsStats } from '../../../features/StoreAnalytics/StoreAnalyticsThunk';
import { BiMinus } from 'react-icons/bi';

/* const orderData = [
  {
    day: 'Sunday',
    sale: 4000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const salesData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const revenueData = [
  {
    day: 'Sunday',
    sale: 2000,
  },
  {
    day: 'Monday',
    sale: 2800,
  },
  {
    day: 'Tuesday',
    sale: 3500,
  },
  {
    day: 'Wednesday',
    sale: 2780,
  },
  {
    day: 'Thursday',
    sale: 1890,
  },
  {
    day: 'Friday',
    sale: 2390,
  },
  {
    day: 'Saturday',
    sale: 500,
  },
];
 */
/* const eComDashboardStatData = [
  {
    id: '1',
    title: 'New Orders',
    metric: 0,
    increased: true,
    decreased: false,
    percentage: 0,
    style: 'text-[#3872FA]',
    fill: '#3872FA',
    chart: [],
    icon: ,
  },
  {
    id: '2',
    title: 'Sales',
    metric: 0,
    increased: false,
    decreased: true,
    percentage: 0,
    style: 'text-[#10b981]',
    fill: '#10b981',
    chart: [],
    icon: <PiChartPieSliceDuotone className="h-6 w-6" />,
  },
  {
    id: '3',
    title: 'Profit',
    metric: 0,
    increased: true,
    decreased: false,
    percentage: 0,
    style: 'text-[#7928ca]',
    fill: '#7928ca',
    chart: [],
    icon: <PiBankDuotone className="h-6 w-6" />,
  },
];
 */
export default function StatCards({ className }: { className?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.StoreAnalytics.stateCards
  );
  const { orderStats, ProfitStats, SalesStats } = data;
  useEffect(() => {
    dispatch(getCardsStats());
  }, [dispatch]);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Box
      component={'div'}
      className={cn('grid grid-col-3 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      <MetricCard
        key={1}
        title={orderStats.title}
        metric={orderStats.metric}
        icon={<PiGiftDuotone className="h-6 w-6" />}
        metricClassName="lg:text-[22px] "
        iconClassName={cn(
          '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5 text-[#3872FA]'
        )}
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <BarChart barSize={5} barGap={2} data={orderStats.chart}>
              <Bar dataKey="orders" fill={'#3872FA'} radius={5} />
            </BarChart>
          </ResponsiveContainer>
        }
        chartClassName="@[200px]:flex @[200px]:items-center h-14 w-24"
        className="@container [&>div]:items-center"
      >
        <Typography
          className={`mt-5 flex items-center border-t border-dashed border-gray-200 pt-4 leading-none text-[14px] tracking-wider font-Inria`}
        >
          <Typography
            variant="body1"
            className={cn(
              'me-2 inline-flex items-center font-medium ',
              orderStats.increased ? 'text-primary-main' : 'text-red-500'
            )}
          >
            {orderStats.increased && (
              <PiCaretDoubleUpDuotone className="me-1 h-4 w-4 text-primary-main" />
            )}
            {orderStats.decreased && (
              <PiCaretDoubleDownDuotone className="me-1 h-4 w-4 text-red-500" />
            )}
            {!orderStats.increased && !orderStats.decreased && (
              <BiMinus className="text-gray-500 me-1 h-4 w-4" />
            )}
            {orderStats.percentage}%
          </Typography>
          <span className="me-1 @[240px]:inline-flex text-[14px] tracking-wider font-Inria">
            {orderStats.increased && 'Increased'}
            {!orderStats.increased && !orderStats.decreased && 'Unchanged'}
            {orderStats.decreased && 'Decreased'}
          </span>
          last month
        </Typography>
      </MetricCard>

      <MetricCard
        key={2}
        title={SalesStats.title}
        metric={SalesStats.metric}
        icon={<PiChartPieSliceDuotone className="h-6 w-6" />}
        metricClassName="lg:text-[22px] "
        iconClassName={cn(
          '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5 text-[#10b981]'
        )}
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <BarChart barSize={5} barGap={2} data={SalesStats.chart}>
              <Bar dataKey="totalAmount" fill={'#10b981'} radius={5} />
            </BarChart>
          </ResponsiveContainer>
        }
        chartClassName="@[200px]:flex @[200px]:items-center h-14 w-24"
        className="@container [&>div]:items-center"
      >
        <Typography
          className={`mt-5 flex items-center border-t border-dashed border-gray-200 pt-4 leading-none text-[14px] tracking-wider font-Inria`}
        >
          <Typography
            variant="body1"
            className={cn(
              'me-2 inline-flex items-center font-medium ',
              SalesStats.increased ? 'text-primary-main' : 'text-red-500'
            )}
          >
            {SalesStats.increased && (
              <PiCaretDoubleUpDuotone className="me-1 h-4 w-4 text-primary-main" />
            )}
            {SalesStats.decreased && (
              <PiCaretDoubleDownDuotone className="me-1 h-4 w-4 text-red-500" />
            )}
            {!SalesStats.increased && !SalesStats.decreased && (
              <BiMinus className="text-gray-500 me-1 h-4 w-4" />
            )}
            {SalesStats.percentage}%
          </Typography>
          <span className="me-1 @[240px]:inline-flex text-[14px] tracking-wider font-Inria">
            {SalesStats.increased && 'Increased'}
            {!SalesStats.increased && !SalesStats.decreased && 'Unchanged'}
            {SalesStats.decreased && 'Decreased'}
          </span>
          last month
        </Typography>
      </MetricCard>

      <MetricCard
        key={2}
        title={ProfitStats.title}
        metric={ProfitStats.metric}
        icon={<PiBankDuotone className="h-6 w-6" />}
        metricClassName="lg:text-[22px] "
        iconClassName={cn(
          '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5 text-[#7928ca]'
        )}
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <BarChart barSize={5} barGap={2} data={ProfitStats.chart}>
              <Bar dataKey="totalProfit" fill={'#7928ca'} radius={5} />
            </BarChart>
          </ResponsiveContainer>
        }
        chartClassName="@[200px]:flex @[200px]:items-center h-14 w-24"
        className="@container [&>div]:items-center"
      >
        <Typography
          className={`mt-5 flex items-center border-t border-dashed border-gray-200 pt-4 leading-none text-[14px] tracking-wider font-Inria`}
        >
          <Typography
            variant="body1"
            className={cn(
              'me-2 inline-flex items-center font-medium ',
              ProfitStats.increased ? 'text-primary-main' : 'text-red-500'
            )}
          >
            {ProfitStats.increased && (
              <PiCaretDoubleUpDuotone className="me-1 h-4 w-4 text-primary-main" />
            )}
            {ProfitStats.decreased && (
              <PiCaretDoubleDownDuotone className="me-1 h-4 w-4 text-red-500" />
            )}
            {!ProfitStats.increased && !ProfitStats.decreased && (
              <BiMinus className="text-gray-500 me-1 h-4 w-4" />
            )}
            {ProfitStats.percentage}%
          </Typography>
          <span className="me-1 @[240px]:inline-flex text-[14px] tracking-wider font-Inria">
            {ProfitStats.increased && 'Increased'}
            {!ProfitStats.increased && !ProfitStats.decreased && 'Unchanged'}
            {ProfitStats.decreased && 'Decreased'}
          </span>
          last month
        </Typography>
      </MetricCard>
    </Box>
  );
}
