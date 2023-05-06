import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from './bookingService';

// First fetch
const booking = JSON.parse(localStorage.getItem('booking'));

// Initialize state
const initialState = {
  booking: booking ? booking : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new booking
export const createNewBooking = createAsyncThunk(
  'booking/new-booking',
  async (bookingData, thunkAPI) => {
    try {
      return await bookingService.createNewBooking(bookingData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset
export const resetBooking = createAsyncThunk(
  'booking/reset-booking',
  async (thunkAPI) => {
    try {
      return await bookingService.resetBooking();
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
export const bookingSlice = createSlice({
  name: 'booking',
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
      .addCase(createNewBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(createNewBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.booking = null;
      })
      .addCase(resetBooking.fulfilled, (state) => {
        state.booking = null;
      });
  },
});

//
export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
