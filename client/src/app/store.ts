import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootreducer';  // Combine all slices

const store = configureStore({
    reducer: rootReducer,
});

export default store;
