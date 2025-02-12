import { WishlistItemProps } from '../components/base/wishlistItem/interfaces';

export interface WishlistType extends WishlistItemProps {}

export interface WishlistState {
  wishlist: {
    data: WishlistType[];
    loading: boolean;
    error: string;
  };
  createWishList: {
    data: WishlistType | {};
    loading: boolean;
    error: string;
  };
  removefromWishList: {
    data: WishlistType | {};
    loading: boolean;
    error: string;
  };
  open: boolean;
}
