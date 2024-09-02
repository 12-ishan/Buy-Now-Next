
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slice/registerSlice';
import productCategoryReducer from './slice/productCategoriesSlice';
import productsReducer from './slice/productsSlice'; 
import authReducer from './slice/authSlice';

import myProfileReducer from './slice/myProfileSlice';

import productDetailReducer from './slice/productDetailSlice';
import cartReducer from './slice/cartSlice';
import loggedInCartReducer from './slice/loggedInCartSlice';
import orderReducer from './slice/orderSlice';
//import myProfileReducer from './slice/myProfileSlice';

//import authReducer from './slice/authStatusSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    productCategory: productCategoryReducer,
    products: productsReducer, 
    auth: authReducer,
    productDetail: productDetailReducer,
    cart: cartReducer, 
    loggedInCart: loggedInCartReducer,
    order: orderReducer
  }
});

export default store;
