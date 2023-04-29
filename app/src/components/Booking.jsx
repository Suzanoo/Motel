import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewBooking } from '../features/booking/bookingSlice';

import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import Guests from './GuestDropdown';
import RoomName from './RoomNameDropdown';

/** Concept Definition from ChatGPT
 *  To pass the selected room type value from the roomName component to the Booking component,
 *  you can lift the state up from roomName to Booking component
 *  by defining a state in the Booking component that can be updated by passing a callback function
 *  from the Booking component to the roomName component */

const Booking = ({ rooms }) => {
  // Variable
  const dispatch = useDispatch();

  // Define state
  const [roomName, setRoomName] = useState('Gemini');
  const [roomId, setRoomId] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guest, setGuest] = useState('2 Guest');

  const onSubmit = (el) => {
    el.preventDefault();
    const reserve = {
      room: roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest,
    };
    dispatch(createNewBooking(reserve));
  };

  return (
    <>
      <form onSubmit={onSubmit} className="h-[300px] lg:h-[70px]">
        <div className="flex flex-col w-full h-full lg:flex-row">
          {/* Room */}
          <div className="flex-1 border-r">
            <RoomName
              rooms={rooms}
              value={roomName}
              onChange={(label, id) => {
                setRoomName(label);
                setRoomId(id);
              }}
              id="roomName"
            />
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
            className="btn btn-lg btn-primary flex-1 text-white h-full"
          >
            Booking
          </button>
        </div>
      </form>
    </>
  );
};

export default Booking;
