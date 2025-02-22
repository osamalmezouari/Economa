import {
  PiArrowDownRight,
  PiArrowUpRight,
  PiCalendarCheck,
  PiCheckCircle,
  PiClock,
  PiPhoneSlash,
} from 'react-icons/pi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getRefillInsightsCardsStats } from '../../../features/RefillInsights/refillInsightsThunk';
import { Card, CardContent, Typography, Grid, Grid2 } from '@mui/material';
import cn from '../../../utils/class-names';

const RefillStatCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.RefillInsights.RefillReqStatsCard
  );

  useEffect(() => {
    dispatch(getRefillInsightsCardsStats());
  }, [dispatch]);

  const getIcon = (title: string) => {
    switch (title) {
      case 'Total Requests':
        return <PiCalendarCheck className="w-[30px] h-auto" />;
      case 'Pendding Requests':
        return <PiClock className="w-[30px] h-auto" />;
      case 'Approved Requests':
        return <PiCheckCircle className="w-[30px] h-auto" />;
      case 'Rejected Requests':
        return <PiPhoneSlash className="w-[30px] h-auto" />;
      default:
        return null;
    }
  };

  return (
    <Grid container className="mt-4 justify-between">
      {!loading && data.length > 0
        ? data.map((stat, index) => (
            <Grid2 size={2.9} key={stat.title}>
              <Card
                className={cn(
                  'group w-full rounded-[14px] border border-gray-300 p-2 shadow-none',
                  index === 0 && 'bg-[#2B7F75] text-white'
                )}
              >
                <CardContent className="p-4">
                  <div className="mb-4 flex items-center gap-5">
                    <span
                      className={cn(
                        'flex rounded-[14px] p-2.5',
                        index === 0
                          ? 'bg-white text-[#2B7F75]'
                          : 'bg-primary-main text-white'
                      )}
                    >
                      {getIcon(stat.title)}
                    </span>
                    <div className="space-y-1.5">
                      <Typography
                        variant="body2"
                        className={cn(
                          'font-medium text-gray-500',
                          index === 0 && 'text-gray-100'
                        )}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        className={cn(
                          'font-bold text-gray-900',
                          index === 0 && 'text-gray-0'
                        )}
                      >
                        {stat.metric}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        'flex items-center gap-1',
                        stat.increased ? 'text-green-dark' : 'text-red-dark'
                      )}
                    >
                      <span
                        className={cn(
                          'flex rounded-full px-2.5 py-1.5',
                          index === 0 ? 'bg-white text-primary-main' : '',
                          stat.increased && index != 0
                            ? 'bg-green-200 text-green-600 '
                            : '',
                          stat.decreased && index != 0
                            ? 'bg-red-200 text-red-600'
                            : ''
                        )}
                      >
                        {stat.increased && index != 0 ? (
                          <PiArrowUpRight className="h-auto w-4" />
                        ) : (
                          <PiArrowDownRight className="h-auto w-4" />
                        )}
                      </span>
                      <Typography variant="body2" className="font-semibold">
                        {stat.percentage}%
                      </Typography>
                    </div>
                    <Typography
                      variant="caption"
                      className={`${index === 0 ? 'text-white' : 'text-secondary-main'}`}
                    >
                      {stat.increased ? 'Increased' : 'Decreased'} last month
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid2>
          ))
        : ''}
    </Grid>
  );
};

export default RefillStatCard;
