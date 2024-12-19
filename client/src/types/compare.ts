import { CompareItemProps } from '../components/base/compareItem/interface';
import { ApiError } from './apierror';

export interface CompareType extends CompareItemProps {}
export interface CompareStateType {
  compareItemsIds: string[];
  data: CompareType[];
  loading: boolean;
  error: ApiError | null | undefined | unknown | string;
}
