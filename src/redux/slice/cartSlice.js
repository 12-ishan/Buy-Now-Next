import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loadCartFromLocalStorage = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
  const sessionId = localStorage.getItem('session_id') || null; 
  return { cartItems, totalAmount, sessionId };
};

export const syncCart = createAsyncThunk(
  'syncCart',
  async (cart, sessionId) => {
    console.log("cart", cart);
    console.log("session_id", sessionId);
    const response = await axios.post('http://127.0.0.1:8000/api/v1/cart/sync', {cart, sessionId});
    return response.data;
  }
);

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    storeInCart(state, action) {
      const { productDetail, quantity } = action.payload;

      const existingProduct = state.cartItems.find(item => item.product_id === productDetail.id);

      const price = Number(productDetail.price) || 0;
      const qty = Number(quantity) || 1;

      if (existingProduct) {
        existingProduct.quantity += qty;
        existingProduct.total_price += price * qty;
      
        
      } else {
        state.cartItems.push({
          product_id: productDetail.id,
          product_name: productDetail.name,
          product_image: productDetail.image,
          product_price: productDetail.price,
          total_price: price * qty,  
          quantity: qty,
        });
      }

      state.totalAmount += price * qty;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    removeFromCartForGuestCustomer(state, action) {
      const itemToRemove = state.cartItems.find(
        (item) => item.product_id === action.payload
      );
      console.log(itemToRemove)
    
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.total_price;
        state.cartItems = state.cartItems.filter(
          (item) => item.product_id !== action.payload
        );
      }
    
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    
      if (state.cartItems.length === 0) {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalAmount');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const sessionId = action.payload.response;
        if (sessionId) {
          localStorage.setItem('session_id', sessionId);
        }
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    }
});

export const { storeInCart, removeFromCartForGuestCustomer } = cartSlice.actions;
export default cartSlice.reducer;
