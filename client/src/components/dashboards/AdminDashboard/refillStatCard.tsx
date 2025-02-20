import { PiArrowDownRight, PiArrowUpRight } from 'react-icons/pi';
import cn from '../../../utils/class-names';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getRefillInsightsCardsStats } from '../../../features/RefillInsights/refillInsightsThunk';

const RefillStatCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.RefillInsights.RefillReqStatsCard
  );
  useEffect(() => {
    dispatch(getRefillInsightsCardsStats());
  }, [dispatch]);

  return (
    <>
      {!loading && data.length > 0
        ? data.map((stat) => {
            return (
              <div
                className={cn(
                  'group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]'
                )}
              >
                <div className="mb-4 flex items-center gap-5">
                  <span
                    className={cn(
                      'flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75] dark:text-gray-900 dark:group-first:bg-gray-900'
                    )}
                  >
                    {/* <Icon className="h-auto w-[30px]" /> */}
                  </span>
                  <div className="space-y-1.5">
                    <p className="font-medium text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
                      {stat.title}
                    </p>
                    <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
                      {stat.metric}
                    </p>
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
                        'flex rounded-full px-2.5 py-1.5 group-first:bg-gray-0 dark:group-first:bg-gray-900 dark:group-first:text-green-700',
                        stat.increased
                          ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                          : 'bg-red-lighter/70 dark:bg-red-dark/30'
                      )}
                    >
                      {stat.increased ? (
                        <PiArrowUpRight className="h-auto w-4" />
                      ) : (
                        <PiArrowDownRight className="h-auto w-4" />
                      )}
                    </span>
                    <span className="font-semibold leading-none group-first:text-gray-0 dark:group-first:text-gray-900">
                      {stat.increased ? '+' : '-'}
                      {stat.percentage}%
                    </span>
                  </div>
                  <span className="truncate leading-none text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
                    {stat.increased ? 'Increased' : 'Decreased'}&nbsp;last month
                  </span>
                </div>
              </div>
            );
          })
        : ''}
    </>
  );
};

export default RefillStatCard;
