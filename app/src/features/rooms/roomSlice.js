import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

/*
1.Fetch tour from localStorage & cast to JSON object
2.Initialize state
3.Create async action-reducer:
4.Create slice
*/

// Fetch tours from localStorage & cast to JSON object
const rooms = JSON.parse(localStorage.getItem('rooms'));

// Initialize state
const initialState = {
  rooms: rooms ? rooms : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action-reducer
export const getAllRooms = createAsyncThunk(
  // Action type
  'rooms/get_all_rooms',
  // Payload
  async (thunkAPI) => {
    try {
      return await roomService.getAll();
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
export const roomSlice = createSlice({
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
  // Manage payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.rooms = null;
      });
  },
});

// Action
export const { reset } = roomSlice.actions;

// Reducer
export default roomSlice.reducer;
