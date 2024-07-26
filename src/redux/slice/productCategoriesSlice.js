import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductCategories = createAsyncThunk(
  'productCategory/fetchProductCategories',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/product-category');
    //console.log(response);
    return response.data.categories;
  }
);

const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productCategorySlice.reducer;
