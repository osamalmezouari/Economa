import { ApiError } from './apierror';

export interface ProductCardType {
  id: string;
  discount: number;
  name: string;
  categoryName: string;
  description: string;
  productAvgRaiting: number;
  price: string;
  priceWithDiscount: number;
  unit: string;
  imageLink: string;
}

export interface ProductsNewArrivals extends ProductCardType {}

export interface ProductDialogProps extends ProductCardType {
  open: boolean;
  setopen: (open: boolean) => void;
}

export interface ProductCardStateType {
  productsCard: {
    data: ProductCardType[];
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  productsNewArrivals: {
    data: ProductsNewArrivals[];
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
}
