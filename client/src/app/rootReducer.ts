import { combineReducers } from 'redux';
import { categoryReducer } from '../features/category/categorySlice';
import { productsReducer } from '../features/products/productSlice';

const rootReducer = combineReducers({
    category: categoryReducer,
    products: productsReducer
});

export default rootReducer;
