import { Typography } from '@mui/material';
import cn from '../../../../utils/class-names';
import React from 'react';
import { PageHeaderTypes } from './interface';
import Breadcrumb from '../../../base/Breadcrumb/Breadcrumb';

export default function PageHeader({
  title,
  breadcrumb = [],
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex  gap-4 flex-row items-center justify-between">
        <div className="space-y-2">
          <Typography
            component="h2"
            className="text-[28px] font-bold font-Inria"
          >
            {title}
          </Typography>
          {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
        </div>
        {children && <div>{children}</div>}
      </div>
    </header>
  );
}
