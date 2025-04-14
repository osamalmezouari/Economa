import {
  Badge,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CustomYAxisTick } from '../../../../base/charts/custom-yaxis-tick';
import { CustomTooltip } from '../../../../base/charts/custom-tooltip';
import { formatNumber } from '../../../../../utils/format-number';
import cn from '../../../../../utils/class-names';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import { useEffect } from 'react';
import { getCostXProfitLastWeek } from '../../../../../features/StoreAnalytics/StoreAnalyticsThunk';

export default function CostXProfitLastWeek({
  className,
}: {
  className?: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { data  } = useSelector(
    (state: RootState) => state.StoreAnalytics.CostXProfitLastWeek
  );
  useEffect(() => {
    dispatch(getCostXProfitLastWeek());
  }, [dispatch]);
  const totalProfitLastWeek = data.reduce((acc, item) => acc + item.profit, 0);
  return (
    <Card
      className={cn('p-2 mt-6 rounded-[5px] shadow-none h-[500px]', className)}
      variant="outlined"
    >
      <CardContent>
        <Typography
          variant="body2"
          className="font-normal text-secondary-main mb-2.5"
        >
          Weekly Costs vs. Profit
        </Typography>
        <div className="flex items-center justify-between">
          <Typography variant="h3" className="me-2 font-semibold">
            ${totalProfitLastWeek.toFixed(2)}
          </Typography>
          <Box className={'flex gap-4 mt-2'}>
            <Box>
              <Badge
                color="primary"
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundImage:
                      'linear-gradient(45deg, #fef3c7, #FCB03D, #FCB03D)',
                    right: 'auto',
                  },
                }}
              />

              <Typography
                variant="body2"
                className="ml-6 inline"
                color="text.secondary"
              >
                Cost
              </Typography>
            </Box>
            <Box>
              <Badge
                color="primary"
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundImage:
                      'linear-gradient(45deg, #A5BDEC, #477DFF, #477DFF)',
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
          </Box>
        </div>

        <div className="h-96 w-full pt-9">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              barSize={20}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20  [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient
                  id="colorProfit"
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
              <defs>
                <linearGradient
                  id="colorSales"
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
                dataKey="cost"
                barSize={40}
                fill="url(#colorProfit)"
                stroke="#FCB03D"
                strokeOpacity={0.3}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="bump"
                dataKey="profit"
                stroke="#477DFF"
                fill="url(#colorSales)"
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
