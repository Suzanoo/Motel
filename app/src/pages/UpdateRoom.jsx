import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { updateRoom, reset, getAllRooms } from '../features/rooms/roomSlice';

function UpdateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rooms, isLoading } = useSelector((state) => state.rooms);

  //Initialize
  const initialState = {
    roomName: '',
    roomNumber: '',
    roomType: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    accessories: [],
    roomSize: '',
    maxPerson: 2,
    price: '',
    priceDiscount: 0,
    images: '',
  };

  const [formData, setFormData] = useState(initialState);

  // Listening rooms
  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  // Fill data into field depend on user select from Table:
  useEffect(() => {
    const room = rooms.data.data.find((t) => t._id === id);
    if (room) {
      setFormData(room);
    }
  }, [rooms, id]);

  // Assign form fields
  const {
    roomName,
    roomNumber,
    roomType,
    description,
    // accessories,
    price,
    priceDiscount,
    images,
  } = formData;

  // Form fields listener
  const handleChange = (el) => {
    setFormData((prevState) => ({
      ...prevState,
      [el.target.name]: el.target.value,
    }));
  };

  // Upload image
  const handleUploadImg = (e) => {
    const file = e.target.files[0];

    // Create a new FormData object
    const formData = new FormData();
    formData.append('images', file); // same name in schema, multer will catch this name

    try {
      dispatch(updateRoom({ id, formData }))
        .then(dispatch(getAllRooms()))
        .then(dispatch(reset()));
    } catch (e) {}
  };

  // Update room
  const onSubmit = (e) => {
    e.preventDefault();

    // Fetch values from form
    const roomData = {
      roomName,
      roomNumber,
      roomType,
      description,
      // accessories,
      price: Number(formData.price),
      priceDiscount: Number(formData.priceDiscount),
      images,
    };

    try {
      dispatch(updateRoom({ id, roomData }));
      navigate('/admin');
    } catch (error) {
      // console.log(error);
    }
  };

  if (isLoading) return <div className="spinner">Loading...</div>;

  return (
    <>
      <div className="flex justify-center mx-auto py-24 bg-pink-200">
        <div className="flex-col w-2/3 mt-20">
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
                disabled={true}
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
                disabled={true}
              >
                <option value="">--Choose...--</option>
                {['sea view', 'delux', 'suit', 'middle age'].map(
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
                disabled={true}
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
            {/* Images */}
            <div className="py-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imageCover"
              >
                Images
              </label>
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded py-2 
              px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="image"
                  value={images}
                  disabled={true}
                />

                {/** Upload Img */}
                <div>
                  <input
                    type="file"
                    name="images" // set this name for Multer to use
                    className="hidden"
                    onChange={handleUploadImg}
                  />
                  <button
                    type="button"
                    className="baseline text-white bg-blue-400 hover:scale-110 font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      document.querySelector('input[type="file"]').click();
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>

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
        </div>
      </div>
    </>
  );
}

export default UpdateRoom;
