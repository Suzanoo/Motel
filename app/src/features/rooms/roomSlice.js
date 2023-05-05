import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

// Fetch rooms from localStorage & cast to JSON object
const rooms = JSON.parse(localStorage.getItem('rooms'));

// Initialize state
const initialState = {
  rooms: rooms ? rooms : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

/**
 * Async action creator to get all rooms
 * @access  All
 * @route   GET /api/v1/booking
 * @param   {object} thunkAPI - Redux Thunk API
 * @returns {Promise} - Resolved with array of rooms on success or rejected with error message on failure
 */
export const getAllRooms = createAsyncThunk(
  'rooms/get-all_rooms',
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

/**
 * Async action creator to create a new room
 * @access  Admin
 * @route   POST /api/v1/booking
 * @param   {object} data - Room data
 * @param   {object} thunkAPI - Redux Thunk API
 * @returns {Promise} - Resolved with array of rooms on success or rejected with error message on failure
 */
export const createNewRoom = createAsyncThunk(
  'rooms/create-new-room',
  async (data, thunkAPI) => {
    try {
      return await roomService.createNewRoom(data);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Async action creator to update a room
 * @access  Admin
 * @route   PATCH /api/v1/booking/id
 * @param   {object} param0 - Object containing room ID and form data
 * @param   {object} thunkAPI - Redux Thunk API
 * @returns {Promise} - Resolved with updated room on success or rejected with error message on failure
 */
export const updateRoom = createAsyncThunk(
  'rooms/update-room',
  async ({ id, roomData }, thunkAPI) => {
    try {
      return await roomService.updateRoom(id, roomData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Async action creator to update a room
 * @access  Admin
 * @route   DELETE /api/v1/booking/id
 * @param   {object} param0 - Object containing room ID and form data
 * @param   {object} thunkAPI - Redux Thunk API
 * @returns {Promise} - Resolved with updated room on success or rejected with error message on failure
 */
export const deleteRoom = createAsyncThunk(
  'rooms/delete-room',
  async (id, thunkAPI) => {
    try {
      await roomService.deleteRoom(id);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetRooms = createAsyncThunk(
  'rooms/reset-room',
  async (thunkAPI) => {
    try {
      return await roomService.resetRooms();
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
      // Get all rooms
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
      })
      // Create a new room
      .addCase(createNewRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(createNewRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Delete a room
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetRooms.fulfilled, (state) => {
        state.rooms = null;
      });
  },
});

// Action
export const { reset } = roomSlice.actions;

// Reducer
export default roomSlice.reducer;
