import { CompareItemProps } from '../components/base/compareItem/interface';

export interface CompareType extends CompareItemProps {}
export interface CompareStateType {
  compareItemsIds: string[];
  data: CompareType[];
  loading: boolean;
  error: string;
}
