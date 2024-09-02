import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async ({ category, slug }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/product-detail/${category}/${slug}`);
      
      return response.data.response;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    singleProduct: {},
    productVariation: [],
    attributes: [],
    maxPrice: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleProduct = action.payload.product.productDetails;
        state.productVariation = action.payload.product.productVariation;
        state.attributes = action.payload.product.attributes;
        state.maxPrice = action.payload.product.maxPrice;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default productDetailSlice.reducer;
