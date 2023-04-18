import axios from 'axios';

const API_URL = 'api/v1/rooms';

// Get All
const getAll = async () => {
  const response = await axios.get(API_URL);
  // console.log(response.data);
  if (response.data)
    localStorage.setItem('rooms', JSON.stringify(response.data));
  return response.data;
};

// Create services
const roomsService = {
  getAll,
};

export default roomsService;
