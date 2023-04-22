import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

// Fetch products from localStorage & cast to JSON object
const products = JSON.parse(localStorage.getItem('rooms'));

// Initialize state
const initialState = {
  products: products ? products : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action:reducer
export const getAllProducts = createAsyncThunk(
  // Action type
  'products/get_all_products',
  // Payload:
  async (thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  // Action type
  'products/create-new-product',
  // Payload:
  async (productData, thunkAPI) => {
    // console.log(productData);
    try {
      return await productService.createNewProduct(productData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  // Action type
  'products/update-product',
  //  * createAsyncThunk expects a single argument creator function
  //  * that takes a single argument as payload
  async ({ id, productData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, productData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  // Action type
  'products/delete-product',
  //  * createAsyncThunk expects a single argument creator function
  //  * that takes a single argument as payload
  async (id, thunkAPI) => {
    try {
      await productService.deleteProduct(id);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create slice
export const productSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false; // ****
      state.isError = false;
      state.message = '';
    },
  },
  // Payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action
export const { reset } = productSlice.actions;

// Reducer
export default productSlice.reducer;
