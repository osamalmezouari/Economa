export interface CategoryType {
  id: string;
  name: string;
  svgLink: string;
  description: string;
  productsCount?: number;
}

export interface CategoryStateType {
  categories: CategoryType[];
  loading: boolean;
  error: string | null;
}

export interface CategoryCardProps {
  name: string;
  description: string;
  svgLink: string;
  linkTo: string;
  productsCount: number;
}
