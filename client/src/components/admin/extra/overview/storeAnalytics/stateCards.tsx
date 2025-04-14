import cn from '../../../../../utils/class-names';
import {
  PiBankDuotone,
  PiCaretDoubleDownDuotone,
  PiCaretDoubleUpDuotone,
  PiChartPieSliceDuotone,
  PiGiftDuotone,
} from 'react-icons/pi';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { useEffect } from 'react';
import { getCardsStats } from '../../../../../features/StoreAnalytics/StoreAnalyticsThunk';
import { BiMinus } from 'react-icons/bi';
import MetricCard from '../../../base/metric-card';

export default function StatCards({ className }: { className?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.StoreAnalytics.stateCards
  );
  const { orderStats, ProfitStats, SalesStats } = data;
  useEffect(() => {
    dispatch(getCardsStats());
  }, [dispatch]);

  /*if (loading) {
    return <>loading...</>;
  }*/

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
