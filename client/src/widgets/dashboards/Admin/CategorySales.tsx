import {
  Bar,
  Cell,
  Line,
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
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Box,
  Badge,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getSalesXProfitCategory } from '../../../features/StoreAnalytics/StoreAnalyticsThunk';

const CategorySales = ({ className }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.StoreAnalytics.SalesXProfitCategory
  );
  useEffect(() => {
    dispatch(getSalesXProfitCategory());
  }, [dispatch]);

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  return (
    <Card
      className={cn(
        className,
        'p-4 mt-6 rounded-[5px] shadow-none border-[1px] h-[500px] '
      )}
    >
      <CardHeader
        title={
          <>
            <Typography
              variant="body1"
              className="text-gray-500"
              sx={{
                fontSize: 14,
                mb: 1.5,
                mt: 1.5,
              }}
            >
              Sales By Category
            </Typography>
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="me-2 font-semibold">
                ${totalSales.toFixed(2)}
              </Typography>
              <Box className={'flex gap-4 mt-2'}>
                <Box>
                  <Badge
                    color="primary"
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#244d68',
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
                <Box>
                  <Badge
                    color="primary"
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#eab308',
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
          </>
        }
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      />

      <CardContent sx={{ p: 0 }}>
        <div>
          <div className="h-96 w-full pt-9">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: -15,
                }}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
              >
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis
                  dataKey="category"
                  className="text-[12px]"
                  axisLine={false}
                  tickLine={false}
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
                <Tooltip
                  content={<CustomTooltip formattedNumber={true} prefix="$" />}
                />

                <defs>
                  <linearGradient
                    id="belowTarget"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                  >
                    <stop offset="0" stopColor="#ecf0f1" />
                    <stop offset="0.8" stopColor="#9c88ff" />
                    <stop offset="1" stopColor="#9c88ff" />
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient
                    id="aboveTarget"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                  >
                    <stop offset="0" stopColor="#A5BDEC" />
                    <stop offset="0.8" stopColor="#273c75" />
                    <stop offset="1" stopColor="#273c75" />
                  </linearGradient>
                </defs>
                <Bar
                  barSize={30}
                  dataKey="sales"
                  stroke="#273c75"
                  strokeOpacity={0}
                  radius={[4, 4, 0, 0]}
                >
                  {data.map((item) => (
                    <Cell
                      key={item.category}
                      fill={
                        item.sales >= item.sales
                          ? 'url(#aboveTarget)'
                          : 'url(#belowTarget)'
                      }
                    />
                  ))}
                </Bar>
                <Line
                  stroke="#eab308"
                  dataKey="profit"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/* function Legend({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-start gap-3 lg:gap-4', className)}>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2980b9]" />
        <span>Sales</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
        <span>Target</span>
      </span>
    </div>
  );
} */

export default CategorySales;
