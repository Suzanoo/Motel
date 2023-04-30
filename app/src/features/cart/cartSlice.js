import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';

// Fetch from localStorage & cast to JSON object
const cart = JSON.parse(localStorage.getItem('cart'));

// Initialize state
const initialState = {
  cart: cart ? cart : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action-reducer
export const addToCart = createAsyncThunk(
  // Action type
  'cart/add-to-cart',
  // Payload
  async (reserve, thunkAPI) => {
    try {
      return await cartService.addToCart(reserve);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create async action-reducer
export const fetchCart = createAsyncThunk(
  // Action type
  'cart/fetch-cart',
  // Payload
  async (thunkAPI) => {
    try {
      return await cartService.fetchCart();
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false; // ****
      state.isError = false;
      state.message = '';
    },
  },
  // Manage payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cart = [];
      })
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

//
export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
