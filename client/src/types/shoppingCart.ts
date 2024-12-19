import { shoppingCartItemProps } from '../components/base/shoppingCartItem/interface';
import { ApiError } from './apierror';

export interface ShoopingCartType extends shoppingCartItemProps {}

export interface shoppingCartStateType {
  shoppingCartWithProducts: {
    data: ShoopingCartType[];
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  createshoppingCart: {
    data: createShoppingCart | {};
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  removefromshoppingCart: {
    data: removefromshoppingCart | {};
    loading: boolean;
    error: ApiError | null | undefined | unknown;
  };
  open: boolean;
  basePrice: number;
  totalPrice: number;
  vat: number;
}

export interface createShoppingCart {
  productId: string;
  quantity: number;
}

export interface removefromshoppingCart {
  id: string;
}
