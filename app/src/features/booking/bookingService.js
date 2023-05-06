import axios from 'axios';

// @desc    Create new bookings
// @route   POST /api/v1/booking
// @access  User
const createNewBooking = async (bookingData) => {
  const { data } = await axios.post(
    'http://localhost:3000/api/v1/booking',
    bookingData,
    {
      // Include cookies in Axios requests
      withCredentials: true,
    }
  );
  if (data) localStorage.setItem('booking', JSON.stringify(data));
  return data;
};

// Reset
const resetBooking = async () => {
  localStorage.removeItem('booking');
};

// Create services
const bookingService = {
  createNewBooking,
  resetBooking,
};

export default bookingService;
