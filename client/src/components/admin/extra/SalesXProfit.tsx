import { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CustomYAxisTick } from '../../base/charts/custom-yaxis-tick';
import { RoundedBottomBar } from '../../base/charts/rounded-bottombar';
import { RoundedTopBar } from '../../base/charts/rounded-topbar';
import { CustomTooltip } from '../../base/charts/custom-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getsalesXProfit } from '../../../features/StoreAnalytics/StoreAnalyticsThunk';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import cn from '../../../utils/class-names';

const StyledCard = styled(Card)(({ theme }) => ({
  '& .recharts-tooltip-cursor': {
    fillOpacity: 0.2,
  },
  '& .recharts-cartesian-axis-tick-value': {
    fill: theme.palette.text.secondary,
  },
  '& .recharts-cartesian-grid-vertical': {
    opacity: 0,
  },
}));

const ChartContainer = styled(Box)({
  height: 384,
  paddingTop: '36px',
});

export default function SalesXProfit({ className }: { className?: string }) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.StoreAnalytics.SalesXProfit
  );
  useEffect(() => {
    dispatch(getsalesXProfit(selectedYear));
  }, [dispatch, selectedYear]);

  /*if (loading) {
    return <>loading ...</>;
  }*/
  return (
    <StyledCard
      className={cn('shadow-none border-[1px] rounded-[5px] mt-6', className)}
    >
      <CardHeader
        title="Sales Report"
        titleTypographyProps={{ variant: 'h5', letterSpacing: '2px' }}
        action={
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ m: 2, width: 200 }}>
              <DatePicker
                views={['year']}
                value={selectedYear !== null ? new Date(selectedYear, 0) : null}
                onChange={(newValue) =>
                  setSelectedYear(newValue ? newValue.getFullYear() : 2025)
                }
                format="yyyy"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    label: 'Select Year',
                    InputProps: {
                      sx: {
                        height: 36, // Set custom input height
                        width: 120, // Set custom input width
                        fontSize: 14, // Set custom font size
                      },
                    },
                  },
                  popper: {
                    sx: {
                      '.MuiYearPicker-root': {
                        maxHeight: '200px', // Adjust dropdown height
                        overflow: 'auto', // Allow scrolling
                      },
                      '.MuiPickersYear-yearButton': {
                        fontSize: '0.875rem', // Smaller font size for year buttons
                        padding: '4px 8px', // Reduce padding around year items
                      },
                    },
                  },
                }}
              />
            </Box>
          </LocalizationProvider>
        }
        subheader={
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
        }
        subheaderTypographyProps={{ component: 'div' }}
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center',
            marginTop: 0,
          },
        }}
      />
      <CardContent>
        <Box sx={{ overflowX: 'auto' }}>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                barSize={isTablet ? 20 : 24}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="salesReport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F0F1FF" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#8200E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className="text-[12px]"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={<CustomYAxisTick prefix="$" />}
                />
                <Tooltip
                  content={
                    <CustomTooltip className="[&_.chart-tooltip-item:last-child]:hidden" />
                  }
                />
                <Bar
                  dataKey="profit"
                  fill="#282ECA"
                  stackId="a"
                  shape={<RoundedBottomBar />}
                />
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="#B8C3E9"
                  fillOpacity={0.9}
                  shape={
                    <RoundedTopBar
                      fill={
                        theme.palette.mode === 'dark' ? '#7c88b2' : '#B8C3E9'
                      }
                    />
                  }
                />
                <Area
                  type="bump"
                  dataKey="profit"
                  stroke="#8200E9"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#salesReport)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
