import { combineReducers } from 'redux';
import { categoryReducer } from '../features/category/categorySlice';
import { productsReducer } from '../features/products/productSlice';
import { authReducer } from '../features/auth/authSlice';
import { shoppingCartReducer } from '../features/shoppingCart/shoppingCartSlice';
import { wishlistReducer } from '../features/wishlist/wishlistSlice';
import { compareReducer } from '../features/compare/compareSlice';
import { UserReducer } from '../features/user/userSlice';
import { balanceReducer } from '../features/balance/balanceSilce';
import { CouponReducer } from '../features/coupon/couponSlice';
import { OrderReducer } from '../features/order/orderSlice';
import { StoreAnalyticsReducer } from '../features/StoreAnalytics/StoreAnalyticsSlice';

const rootReducer = combineReducers({
  category: categoryReducer,
  products: productsReducer,
  auth: authReducer,
  shoppingCart: shoppingCartReducer,
  wishlist: wishlistReducer,
  compare: compareReducer,
  user: UserReducer,
  balance: balanceReducer,
  coupon: CouponReducer,
  order: OrderReducer,
  StoreAnalytics: StoreAnalyticsReducer,
});
export default rootReducer;
