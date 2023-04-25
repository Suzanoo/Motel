import { useState } from 'react';

import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import Guests from './GuestDropdown';
import RoomType from './RoomTypeDropdown';

/** Concept Definition from ChatGPT
 *  To pass the selected room type value from the RoomType component to the Booking component,
 *  you can lift the state up from RoomType to Booking component
 *  by defining a state in the Booking component that can be updated by passing a callback function
 *  from the Booking component to the RoomType component */

const Booking = () => {
  // Define state
  const [roomType, setRoomType] = useState('Gemini');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guest, setGuest] = useState('2 Guest');

  const onSubmit = (el) => {
    el.preventDefault();
    const reserve = {
      roomType,
      checkInDate,
      checkOutDate,
      guest,
    };
    console.log(reserve);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="h-[300px] lg:h-[70px]">
        <div className="flex flex-col w-full h-full lg:flex-row">
          {/* Room type */}
          <div className="flex-1 border-r">
            <RoomType
              value={roomType}
              onChange={(value) => setRoomType(value)}
              id="roomType"
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
