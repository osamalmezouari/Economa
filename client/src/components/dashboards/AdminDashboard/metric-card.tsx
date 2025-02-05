import cn from '../../../utils/class-names';
import { Typography } from '@mui/material';

const metricCardClasses = {
  base: 'border border-gray-200 bg-gray-0 p-5 lg:p-6',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type MetricCardTypes = {
  title: string;
  metric: number;
  icon?: React.ReactNode;
  iconClassName?: string;
  contentClassName?: string;
  chart?: React.ReactNode;
  info?: React.ReactNode;
  rounded?: keyof typeof metricCardClasses.rounded;
  titleClassName?: string;
  metricClassName?: string;
  chartClassName?: string;
  className?: string;
};

export default function MetricCard({
  title,
  metric,
  chart,
  info,
  rounded = 'DEFAULT',
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  metricClassName,
  chartClassName,
  icon,
  children,
}: React.PropsWithChildren<MetricCardTypes>) {

  return (
    <div
      className={cn(
        metricCardClasses.base,
        metricCardClasses.rounded[rounded],
        className
      )}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 lg:h-12 lg:w-12',
                iconClassName
              )}
            >
              {icon}
            </div>
          <div className={cn('ps-3', contentClassName)}>
            <Typography className={cn('mb-0.5 text-gray-500', titleClassName)}>
              {title}
            </Typography>
            <Typography
              className={cn(
                'text-lg font-semibold text-gray-900 2xl:xl:text-xl font-Inria',
                metricClassName
              )}
            >
              {title === 'New Orders' ? metric :"$"+ metric}
            </Typography>

            {info ? info : null}
          </div>
        </div>

        {chart ? (
          <div className={cn('h-12 w-20', chartClassName)}>{chart}</div>
        ) : null}
      </div>

      {children}
    </div>
  );
}
