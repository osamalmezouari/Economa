import { WishlistItemProps } from '../components/base/wishlistItem/interfaces';
import { ApiError } from './apierror';

export interface WishlistType extends WishlistItemProps {}

export interface WishlistState {
  wishlist: {
    data: WishlistType[];
    loading: boolean;
    error: ApiError | unknown | null | undefined;
  };
  createWishList: {
    data: WishlistType |  {};
    loading: boolean;
    error: ApiError | unknown | null | undefined;
  };
  removefromWishList: {
    data: WishlistType | {};
    loading: boolean;
    error: ApiError | unknown | null | undefined;
  };
  open: boolean

}
