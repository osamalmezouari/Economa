import { combineReducers } from 'redux';
import { categoryReducer } from '../features/category/categorySlice';

const rootReducer = combineReducers({
    category : categoryReducer,
    //auth: authReducer,
});

export default rootReducer;
