import axios from 'axios';

const API_URL = 'api/v1/rooms';

// Get all rooms
const getAll = async () => {
  const { data } = await axios.get('http://localhost:3000/api/v1/rooms');
  if (data) localStorage.setItem('rooms', JSON.stringify(data));
  return data;
};

// Create new room
const createNewRoom = async (roomData) => {
  try {
    const { response } = await axios.post(API_URL + '/', roomData, {
      withCredentials: true, // To include cookies in Axios requests
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Update a room (Bypass)
const updateRoom = async (id, roomData) => {
  // Iterate through the FormData object and log all entries
  // for (const entry of formData.entries()) {
  //   console.log(entry);
  // }

  try {
    const { data } = await axios.patch(
      // use absolute path instead of relative path
      `http://localhost:3000/api/v1/rooms/${id}`,
      roomData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }, // For upload image field
        withCredentials: true, // To include cookies in Axios requests to get auth token
      }
    );
    if (data) return data;
  } catch (error) {
    console.error(error);
  }
};

// Delete a room
const deleteRoom = async (id) => {
  try {
    await axios.delete(
      // use absolute path instead of relative path
      `http://localhost:3000/api/v1/rooms/${id}`,
      {
        withCredentials: true, // To include cookies in Axios requests to get auth token
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const resetRooms = async () => {
  localStorage.removeItem('rooms');
};

// Create services
const roomsService = {
  getAll,
  createNewRoom,
  updateRoom,
  deleteRoom,
  resetRooms,
};

export default roomsService;
