
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slice/registerSlice';
import productCategoryReducer from './slice/productCategoriesSlice';
import productsReducer from './slice/productsSlice'; 
import authReducer from './slice/authSlice';
import productDetailReducer from './slice/productDetailSlice';
//import myProfileReducer from './slice/myProfileSlice';
//import authReducer from './slice/authStatusSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    productCategory: productCategoryReducer,
    products: productsReducer, 
    auth: authReducer,
    productDetail: productDetailReducer
   
   
  }
});

export default store;
