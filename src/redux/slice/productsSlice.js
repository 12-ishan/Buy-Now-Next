import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ slug, page }) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/get-products/${slug}?page=${page}`);
    return response.data; 
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    attributes: [],
    categorySlug: '',
    status: 'idle',
    error: null,
    currentPage: 1, 
    lastPage: 1, 
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 1;
      state.lastPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = [...state.products, ...action.payload.products]; 
        state.categorySlug = action.payload.categorySlug;
        state.attributes = action.payload.attributes;
        state.currentPage = action.payload.currentPage; 
        state.lastPage = action.payload.lastPage; 
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
