import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { fetchCart, addToCart, reset } from '../features/cart/cartSlice';

import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import Guests from './GuestDropdown';
import RoomName from './RoomNameDropdown';

const Booking = ({ rooms }) => {
  // Variable
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define state
  const [roomName, setRoomName] = useState('Gemini');
  const [roomId, setRoomId] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guest, setGuest] = useState('2 Guest');
  const { cart, isError, isSuccess, message } = useSelector(
    (state) => state.booking
  );

  // First fetch data on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Listening cart
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [cart, isError, isSuccess, message, navigate, dispatch]);

  // Add to cart
  const onSubmit = (el) => {
    el.preventDefault();
    const reserve = {
      name: roomName,
      room: roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest,
    };

    dispatch(addToCart(reserve));
  };

  // Check if checkInDate and checkOutDate are not null
  const isDatesNotNull = checkInDate !== null && checkOutDate !== null;

  return (
    <>
      <form onSubmit={onSubmit} className="h-[300px] lg:h-[70px]">
        <div className="flex flex-col w-full h-full lg:flex-row">
          {/* Room Dropdown */}
          <div className="flex-1 border-r">
            {rooms.rooms && (
              <RoomName
                rooms={rooms}
                value={roomName}
                onChange={(label, id) => {
                  setRoomName(label);
                  setRoomId(id);
                }}
                id="roomName"
              />
            )}
          </div>
          {/* Check in */}
          <div className="flex-1 border-r">
            <CheckIn
              id="checkInDate"
              selectedDate={checkInDate}
              onChange={(date) => setCheckInDate(date)}
            />
          </div>
          {/* Check out */}
          <div className="flex-1 border-r">
            <CheckOut
              id="checkOutDate"
              selectedDate={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
            />
          </div>
          {/* Guests */}
          <div className="flex-1 border-r">
            <Guests
              value={guest}
              onChange={(value) => setGuest(value)}
              id="guest"
            />
          </div>

          <button
            type="submit"
            className={
              !isDatesNotNull
                ? 'btn btn-lg btn-primary flex-1 text-white h-full pointer-events-none opacity-50'
                : 'btn btn-lg btn-primary flex-1 text-white h-full'
            }
          >
            Add to cart
          </button>
        </div>
      </form>
    </>
  );
};

export default Booking;
