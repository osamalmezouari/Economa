import { Typography } from '@mui/material';
import { WelcomeBannerTypes } from './interface';
import cn from '../../../../utils/class-names';

export default function WelcomeBanner({
  title,
  description,
  media,
  children,
  contentClassName,
  className,
}: React.PropsWithChildren<WelcomeBannerTypes>) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-between rounded-lg border-[1px] shadow-sm bg-white  sm:p-6 lg:px-7 lg:py-6',
        className
      )}
    >
      <div className={cn(contentClassName)}>
        <Typography variant="h3" className="mb-2 text-2xl sm:mb-3 md:text-3xl">
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            className="my-5 text-sm leading-[1.6] text-secondary-main sm:mb-6 sm:text-base md:mb-8 lg:mb-10 "
          >
            {description}
          </Typography>
        )}
        {children}
      </div>
      {media && <div>{media}</div>}
    </div>
  );
}
