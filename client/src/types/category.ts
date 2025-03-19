export interface CategoryType {
  id: string;
  name: string;
  svgLink: string;
  description?: string;
  productsCount?: number;
}
export interface CategoryCardProps {
  name: string;
  svgLink: string;
  linkTo: string;
  productsCount: number;
}

export interface CreateCategory {
  name: string;
  description: string;
  file: any;
}

export interface CreateCategory {
  name: string;
  description: string;
  file: File|any;
}
export interface UpdateCategory {
  name: string;
  description: string;
  file: File|any;
}

export interface CategoryStateType {
  CategoryCards: {
    data: CategoryType[];
    loading: boolean;
    error: string;
  };
  Categories: {
    data: {
      categories: CategoryType[];
      pageCount: number;
    };
    loading: boolean;
    error: string;
  };
  CategoriesnamesandIds: {
    data: CategoriesnamesandIds[];
    loading: boolean;
    error: string;
  };
  createCategory: {
    data: CategoryType;
    loading: boolean;
    error: string;
  };
  updateCategory: {
    data: CategoryType;
    loading: boolean;
    error: string;
  };
  categorytoEdit: String;
  isUpdateCategoryOpen: boolean;
  isCreateCategoryOpen: boolean;
}
