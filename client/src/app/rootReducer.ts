import { combineReducers } from 'redux';
import { categoryReducer } from '../features/category/categorySlice';
import { productsReducer } from '../features/products/productSlice';
import { authReducer } from '../features/auth/authSlice';

const rootReducer = combineReducers({
    category: categoryReducer,
    products: productsReducer,
    auth : authReducer
});
export default rootReducer;
