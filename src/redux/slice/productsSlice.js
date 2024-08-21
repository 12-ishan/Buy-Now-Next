import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (slug) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/get-products/${slug}`);
    return response.data; 
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categorySlug: '', 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = Array.isArray(action.payload.products) ? action.payload.products : []; 
        state.categorySlug = action.payload.categorySlug; 
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
