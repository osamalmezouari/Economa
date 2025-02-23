/* import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getRefillInsightsYearlyChart } from '../../../features/RefillInsights/refillInsightsThunk';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CustomTooltip } from '../../base/charts/custom-tooltip';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import TrendingUpIcon from '../../../components/icons/trending-up';
import { formatNumber } from '../../../utils/format-number';
import { useTheme } from '@mui/material';

export default function RefillYearlyChart() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.RefillInsights.RefillYearlyChart
  );
  const theme = useTheme();

  useEffect(() => {
    dispatch(getRefillInsightsYearlyChart(new Date().getFullYear().toString()));
  }, [dispatch]);

  const chartData = data.monthlyData.map((item) => ({
    label: new Date(0, item.month - 1).toLocaleString('en-US', {
      month: 'short',
    }),
    totalRefillRequests: item.totalRefillRequests || 0, // Keep real values
    totalApproved: item.totalApproved || 0,
    adjustedRefillRequests:
      item.totalRefillRequests > 0 ? item.totalRefillRequests : 1, // Ensure min height
    adjustedApproved: item.totalApproved > 0 ? item.totalApproved : 1,
  }));

  return (
    <Card className={'shadow-none border-[1px] rounded-[10px]'}>
      <CardContent>
        <Typography variant="h6">Yearl Requests Overview</Typography>
        <div className="mb-4 mt-1 flex items-center gap-2">
          <Typography variant="h4" fontWeight="bold">
            ${data.yearTotal}
          </Typography>
          <span className="flex items-center gap-1 text-green-dark">
            <TrendingUpIcon className="h-auto w-5 text-primary-main" />
            <Typography variant="body2" fontWeight="bold" className='text-primary-main'>
              {data.percentageChange}%
            </Typography>
          </span>
        </div>
        <CustomLegend />
        <div className="h-[22rem] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%" minWidth={800}>
            <ComposedChart data={chartData} margin={{ left: -15, top: 20 }}>
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#000', dy: 5 }}
                domain={[0, 'dataMax']}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(label) => label}
                tick={{ fontSize: 12, fill: '#000' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="adjustedRefillRequests" // Use modified value for height
                fill={theme.palette.primary.main}
                barSize={35}
                radius={10}
              >
                <LabelList
                  dataKey="totalRefillRequests" // Use real value for labels
                  content={<CustomizedLabel />}
                />
              </Bar>

              <Bar
                dataKey="adjustedApproved"
                fill={'#f1c40f'}
                barSize={35}
                radius={10}
              >
                <LabelList
                  dataKey="totalApproved"
                  content={<CustomizedLabel />}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Legend Component
function CustomLegend() {
  return (
    <div className="mt-2 flex flex-wrap items-start gap-3 lg:gap-5 w-max ml-auto">
      {['Total Refill Requests', 'Total Approved'].map((name, index) => (
        <div key={name} className="flex items-center gap-1.5">
          <span
            className={`h-3 w-3 rounded-full ${
              index === 2
                ? 'bg-success-main' // Line Chart
                : index === 1
                  ? 'bg-[#f1c40f]' // Second Bar Chart
                  : 'bg-primary-main' // First Bar Chart
            }`}
          />
          <Typography variant="body2">{name}</Typography>
        </div>
      ))}
    </div>
  );
}



function CustomizedLabel({ x, y, width, value }: any) {
  const displayValue = value === 0 ? 0 : value;

  return (
    <g>
      <rect
        x={x + 3}
        y={y + 3}
        width={width - 6}
        height={20}
        rx={8}
        fill="#ffffff"
      />
      <text
        x={x + width / 2}
        y={y + 14}
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(displayValue)}
      </text>
    </g>
  );
}
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getRefillInsightsYearlyChart } from '../../../features/RefillInsights/refillInsightsThunk';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CustomTooltip } from '../../base/charts/custom-tooltip';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  LabelList,
  Line,
} from 'recharts';
import TrendingUpIcon from '../../../components/icons/trending-up';
import { formatNumber } from '../../../utils/format-number';
import { useTheme } from '@mui/material';

export default function RefillYearlyChart() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector(
    (state: RootState) => state.RefillInsights.RefillYearlyChart
  );
  const theme = useTheme();

  useEffect(() => {
    dispatch(getRefillInsightsYearlyChart(new Date().getFullYear().toString()));
  }, [dispatch]);

  const chartData = data.monthlyData.map((item) => ({
    label: new Date(0, item.month - 1).toLocaleString('en-US', {
      month: 'short',
    }),
    totalRefillRequests: item.totalRefillRequests || 0,
    totalApproved: item.totalApproved || 0,
    totalBalance: item.totalBalanceApproved || 0, // New data field for the line chart
    adjustedRefillRequests: item.totalRefillRequests > 0 ? item.totalRefillRequests : 1,
    adjustedApproved: item.totalApproved > 0 ? item.totalApproved : 1,
  }));

  return (
    <Card className={'shadow-none border-[1px] rounded-[10px]'}>
      <CardContent>
        <Typography variant="h6">Yearly Requests Overview</Typography>
        <div className="mb-4 mt-1 flex items-center gap-2">
          <Typography variant="h4" fontWeight="bold">
            ${data.yearTotal}
          </Typography>
          <span className="flex items-center gap-1 text-green-dark">
            <TrendingUpIcon className="h-auto w-5 text-primary-main" />
            <Typography variant="body2" fontWeight="bold" className="text-primary-main">
              {data.percentageChange}%
            </Typography>
          </span>
        </div>
        <CustomLegend />
        <div className="h-[22rem] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%" minWidth={800}>
            <ComposedChart data={chartData} margin={{ left: -15, top: 20 }}>
              <CartesianGrid vertical={false} strokeOpacity={0.435} strokeDasharray="8 10" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#000', dy: 5 }}
                domain={[0, 'dataMax']}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tickFormatter={(label) => label}
                tick={{ fontSize: 12, fill: '#000' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tickFormatter={(label) => formatNumber(label)}
                tick={{ fontSize: 12, fill: '#000' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />

              {/* Bar for Refill Requests */}
              <Bar yAxisId="left" dataKey="adjustedRefillRequests" fill={theme.palette.primary.main} barSize={35} radius={10}>
                <LabelList dataKey="totalRefillRequests" content={<CustomizedLabel />} />
              </Bar>

              {/* Bar for Approved Requests */}
              <Bar yAxisId="left" dataKey="adjustedApproved" fill={'#f1c40f'} barSize={35} radius={10}>
                <LabelList dataKey="totalApproved" content={<CustomizedLabel />} />
              </Bar>

              {/* Line Chart for Total Balance */}
              <Line
                yAxisId="right"
                type="step"
                dataKey="totalBalance"
                stroke="#6495ED"
                strokeWidth={3}
                dot={{ r: 1, fill: '#6495ED' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Legend Component
function CustomLegend() {
  return (
    <div className="mt-2 flex flex-wrap items-start gap-3 lg:gap-5 w-max ml-auto">
      {['Total Refill Requests', 'Total Approved', 'Total Balance'].map((name, index) => (
        <div key={name} className="flex items-center gap-1.5">
          <span
            className={`h-3 w-3 rounded-full ${
              index === 2
                ? 'bg-[#6495ED]' // Line Chart (Balance)
                : index === 1
                ? 'bg-[#f1c40f]' // Second Bar Chart
                : 'bg-primary-main' // First Bar Chart
            }`}
          />
          <Typography variant="body2">{name}</Typography>
        </div>
      ))}
    </div>
  );
}

function CustomizedLabel({ x, y, width, value }: any) {
  const displayValue = value === 0 ? 0 : value;

  return (
    <g>
      <rect x={x + 3} y={y + 3} width={width - 6} height={20} rx={8} fill="#ffffff" />
      <text x={x + width / 2} y={y + 14} fill="currentColor" textAnchor="middle" dominantBaseline="middle">
        {formatNumber(displayValue)}
      </text>
    </g>
  );
}
/*  */