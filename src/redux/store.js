
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
import couponReducer from './slice/couponSlice';
import orderDetailsReducer from './slice/orderDetailsSlice';
import searchReducer from './slice/searchSlice';
import generalSettingsReducer from './slice/generalSettingsSlice';
import landingPagesReducer from './slice/landingPagesSlice';
import productsFilterReducer from './slice/productsFilterSlice';
import contactReducer from './slice/contactSlice';
import wishListReducer from './slice/wishListSlice';
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
    order: orderReducer,
    coupon: couponReducer,
    orderDetail: orderDetailsReducer,
    search: searchReducer,
    generalSettings: generalSettingsReducer,
    landingPage: landingPagesReducer,
    filterProducts: productsFilterReducer,
    contact: contactReducer,
    wishList: wishListReducer
  }
});

export default store;
