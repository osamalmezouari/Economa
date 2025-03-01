import cn from '../../../utils/class-names';
import { formatDate } from '../../../utils/format-date';

interface DateCellProps {
  date: string;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
}

export default function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = 'MMMM d, yyyy',
  timeFormat = 'h:mm a',
}: DateCellProps) {
  const formattedDate = formatDate(date, dateFormat);
  const formattedTime = formatDate(date, timeFormat);
  const dateTimeAttr = formatDate(date, 'yyyy-MM-dd');
  const timeAttr = formatDate(date, 'HH:mm:ss');

  return (
    <div className={cn('flex items-center h-max gap-1', className)}>
      <time
        dateTime={dateTimeAttr}
        className={cn('font-medium text-gray-700 text-[13px]', dateClassName)}
      >
        {formattedDate}
      </time>
      <time
        dateTime={timeAttr}
        className={cn('text-[13px] text-gray-500', timeClassName)}
      >
        {formattedTime}
      </time>
    </div>
  );
}
