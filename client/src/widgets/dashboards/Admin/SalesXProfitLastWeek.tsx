import {
  Card,
  CardContent,
  Typography,
  Divider,
  Badge,
  Box,
} from '@mui/material';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { CustomYAxisTick } from '../../../components/base/charts/custom-yaxis-tick';
import { CustomTooltip } from '../../../components/base/charts/custom-tooltip';
import { formatNumber } from '../../../utils/format-number';
import cn from '../../../utils/class-names';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { useEffect } from 'react';
import { getsalesXProfitLastWeek } from '../../../features/StoreAnalytics/StoreAnalyticsThunk';


export default function SalesXProfitLastWeek({
  className,
}: {
  className?: string;
}) {
  /*   const data = dailyData;
   */
  const dispatch = useDispatch<AppDispatch>();
  const { data, /* loading, error */ } = useSelector(
    (state: RootState) => state.StoreAnalytics.SalesXProfitLastWeek
  );
  useEffect(() => {
    dispatch(getsalesXProfitLastWeek());
  }, [dispatch]);
  return (
    <Card
      className={cn('p-2 mt-6 rounded-[5px] shadow-none', className)}
      variant="outlined"
    >
      <CardContent>
        <Typography
          variant="body2"
          className="font-normal text-secondary-main mb-2.5"
        >
          Sales vs Profit weekly
        </Typography>
        <div className="flex items-center justify-between">
          <Typography variant="h4" className="me-2 font-semibold">
            $83.45k
          </Typography>
          <Box className={'flex gap-4 mt-2'}>
            <Box>
              <Badge
                color="primary"
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#282ECA',
                    right: 'auto',
                  },
                }}
              />
              <Typography
                variant="body2"
                className="ml-6 inline"
                color="text.secondary"
              >
                Profit
              </Typography>
            </Box>
            <Box>
              <Badge
                color="primary"
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#B8C3E9',
                    right: 'auto',
                  },
                }}
              />
              <Typography
                variant="body2"
                className="ml-6 inline"
                color="text.secondary"
              >
                Sales
              </Typography>
            </Box>
          </Box>
        </div>
        <Divider className="my-4" />
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              barSize={20}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#A5BDEC" />
                  <stop offset="0.8" stopColor="#477DFF" />
                  <stop offset="1" stopColor="#477DFF" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient
                  id="colorExpense"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#fef3c7" />
                  <stop offset="0.8" stopColor="#FCB03D" />
                  <stop offset="1" stopColor="#FCB03D" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                className="text-[12px]"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={({ payload, ...rest }) => {
                  const pl = {
                    ...payload,
                    value: formatNumber(Number(payload.value)),
                  };
                  return (
                    <CustomYAxisTick prefix={'$'} payload={pl} {...rest} />
                  );
                }}
              />
              <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />
              <Bar
                dataKey="profit"
                barSize={30}
                fill="url(#colorRevenue)"
                stroke="#477DFF"
                strokeOpacity={0.3}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="bump"
                dataKey="expense"
                stroke="#FCB03D"
                fill="url(#colorExpense)"
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
