import { ApiError } from './error';

export interface CategoryType {
  id: string;
  name: string;
  svgLink: string;
  productsCount?: number;
}
export interface CategoryCardProps {
  name: string;
  svgLink: string;
  linkTo: string;
  productsCount: number;
}
export interface CategoryStateType {
  CategoryCards: {
    data: CategoryType[];
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
}
