import { addSpacesToCamelCase } from '../../../utils/add-spaces-to-camel-case';
import cn from '../../../utils/class-names';
import { Typography } from '@mui/material';

function isValidHexColor(colorCode: string) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(colorCode);
}

export function CustomTooltip({ active, payload, label, className }: any) {
  if (!active) return null;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-gray-300 bg-gray-0 shadow-2xl dark:bg-gray-100',
        className
      )}
    >
      <Typography className="label mb-0.5 block bg-gray-100 p-2 px-2.5 text-center font-lexend text-xs font-semibold capitalize text-gray-600 dark:bg-gray-200/60 dark:text-gray-700 ">
        {label}
      </Typography>
      <div className="px-3 py-1.5 text-xs bg-white">
        {payload.map((item: any, index: number) => (
          <div
            key={item.dataKey + index}
            className="chart-tooltip-item flex items-center py-1.5"
          >
            <span
              className="me-1.5 h-2 w-2 rounded-full"
              style={{
                backgroundColor: isValidHexColor(item.fill)
                  ? item.fill === '#fff'
                    ? item.stroke
                    : item.fill
                  : item.stroke,
              }}
            />
            <Typography>
              <span className="capitalize text-[12px]">
                {addSpacesToCamelCase(item.dataKey)}:
              </span>{' '}
              <span className="font-medium text-[12px] text-gray-900 dark:text-gray-700">
                {item.value}
              </span>
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
