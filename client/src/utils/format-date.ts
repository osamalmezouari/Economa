import { format, parseISO } from 'date-fns';

export function formatDate(date?: string, formatStr: string = 'dd MMM, yyyy'): string {
  if (!date) return '';
  return format(parseISO(date), formatStr);
}
