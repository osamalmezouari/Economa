import { shoppingCartItemProps } from '../components/base/shoppingCartItem/interface';
export interface ShoopingCartType extends shoppingCartItemProps {}

export interface shoppingCartStateType {
  shoppingCartWithProducts: {
    data: ShoopingCartType[];
    loading: boolean;
    error: string | '';
  };
  createshoppingCart: {
    data: createShoppingCart | {};
    loading: boolean;
    error: string | '';
  };
  removefromshoppingCart: {
    data: removefromshoppingCart | {};
    loading: boolean;
    error: string | '';
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
