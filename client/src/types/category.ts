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

export interface CategoriesnamesandIds {
  id: string;
  name: string;
}
export interface CategoryStateType {
  CategoryCards: {
    data: CategoryType[];
    loading: boolean;
    error: string;
  };
  CategoriesnamesandIds: {
    data: CategoriesnamesandIds[];
    loading: boolean;
    error: string;
  };
}
