import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/rooms/roomSlice';
import bookingReducer from '../features/booking/bookingSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    booking: bookingReducer,
    auth: authReducer,
  },
});
