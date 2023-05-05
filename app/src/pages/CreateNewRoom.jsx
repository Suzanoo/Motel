import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { createNewRoom, resetRooms } from '../features/rooms/roomSlice';

function CreateNewRoom() {
  // 1).Initial state
  const initial = {
    roomName: '',
    roomNumber: '',
    roomType: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    price: '',
    priceDiscount: 0,
  };

  // 2).Configure form fields
  const [formData, setFormData] = useState(initial);
  const { roomName, roomNumber, roomType, description, price, priceDiscount } =
    formData;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      roomName,
      roomNumber,
      roomType,
      description,
      price: +price,
      priceDiscount: +priceDiscount,
    };
    try {
      // Create a new room
      await dispatch(createNewRoom(roomData));
      // Reset rooms in store for next refreshing
      await dispatch(resetRooms);
      // Set blank form
      setFormData(initial);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  //5).JSX Rendering
  return (
    <>
      <div className="flex justify-center mx-auto py-24 bg-pink-200">
        <div className="flex-col w-2/3 mt-8">
          <h1 className="font-bold mb-2">Create New Room:</h1>
          <form
            className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            {/* Name */}
            <div className="py-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="roomName"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 
                px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="roomName"
                value={roomName}
                onChange={handleChange}
                required
              />
            </div>
            {/* Room Number */}
            <div className="py-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="roomNumber"
              >
                Room Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 
                px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="roomNumber"
                value={roomNumber}
                onChange={handleChange}
                required
              />
            </div>
            {/* Room Type */}
            <div className="py-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="roomType"
              >
                Room Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 
                px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="roomType"
                value={roomType}
                onChange={handleChange}
              >
                <option value="">--Choose...--</option>
                {['sea view', 'deluxe', 'suit', 'middle age'].map(
                  (option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
            {/* Description */}
            <div className="py-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 
                px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
            {/* Accessories */}
            {/* Price */}
            <div className="py-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 
                px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                required
              />
            </div>
            {/* Price Discount*/}
            <div className="py-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priceDiscount"
              >
                Price Discount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 
                px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="priceDiscount"
                value={priceDiscount}
                onChange={handleChange}
              />
            </div>
            {/* Submit*/}
            <div className="py-4">
              <button
                type="submit"
                className="baseline text-white bg-primary hover:scale-110
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
          <Link className="text-blue-400" to="/admin">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreateNewRoom;
