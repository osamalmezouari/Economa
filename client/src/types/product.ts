import { ApiError } from './apierror';
import { StoreFilters } from './storeFilters';
import Review from './review';
import { MiniProductCardTypeProps } from '../components/base/minProductCard/interfaces';

export interface ProductDetailsParams {
  ProductId: string;
}
export interface ProductStoreType {
  productPageCount: 0;
  products: ProductCardType[];
}

export interface ProductCardType {
  id: string;
  discount: number;
  name: string;
  categoryName: string;
  description: string;
  productAvgRating: number;
  price: string;
  priceWithDiscount: number;
  unit: string;
  imageLink: string;
}

export default interface ProductDetails {
  product: {
    id: string;
    discount: number;
    name: string;
    categoryName: string;
    description: string;
    productAvgRating: number;
    price: string;
    priceWithDiscount: number;
    unit: string;
    imageLink: string;
    categoryId: string;
    reviewsCount: number;
    inStock: boolean;
  };
  reviews: Review[];
  HighlyRighted: ProductCardType[];
  relatedProducts: MiniProductCardTypeProps[];
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
  productsStore: {
    data: ProductStoreType;
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  productsDetails: {
    data: ProductDetails;
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  filters: StoreFilters;
}
