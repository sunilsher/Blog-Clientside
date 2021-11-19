import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import categoryReducer from './slices/categorySlice';
import logger from 'redux-logger';
const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer,
        categories: categoryReducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})

export default store;