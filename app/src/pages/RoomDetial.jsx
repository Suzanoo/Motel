import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheck } from 'react-icons/fa';

import IconRender from '../components/IconRender';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import Guests from '../components/GuestDropdown';
import ScrollToTop from '../components/ScrollToTop';

import { addToCart } from '../features/cart/cartSlice';

const RoomDetail = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.rooms);
  const { slug } = useParams();

  const room = store.rooms.data.data.find((item) => {
    return item.slug === slug;
  });

  // State init
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guest, setGuest] = useState('2 Guest');

  // Add into cart
  const onSubmit = (el) => {
    el.preventDefault();
    const reserve = {
      name: room.roomName,
      room: room._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest,
    };

    dispatch(addToCart(reserve));
  };

  // Check if checkInDate and checkOutDate are not null
  const isDatesNotNull = checkInDate !== null && checkOutDate !== null;

  return (
    <section className="bg-orange-200 relative">
      <ScrollToTop />

      {/* banner */}
      <div className="flex flex-col relative justify-center items-center">
        <div className="mb-6">
          <img
            src={`${require(`../public/assets/detail-img/${room.images}`)}`}
            alt=""
          />
        </div>
        {/* title */}
        <div className="relative z-20 text-accent text-3xl font-primary uppercase">
          {room.roomName} : {room.roomType}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row lg:flex-row h-full py-8 mx-8 mb-12">
          {/* left */}
          <div className="w-full h-full lg:w-[60%] mb-4 lg:mr-4">
            <h3 className="h3 font-bold font-primary">Stuff</h3>
            <p>{room.description}</p>
            {/* facilities */}
            <h3 className="h3 font-bold font-primary mt-4">Accesories</h3>
            <IconRender accessories={room.accessories} />
          </div>

          {/* right */}
          <div className="w-full h-full lg:w-[40%]">
            {/* Form */}
            <form onSubmit={onSubmit} className="bg-accent/20 py-6 px-6">
              <div className="flex flex-col space-y-6">
                <h3 className="h3 font-bold font-primary">Your Reservation</h3>

                {/* Room type */}
                <div className="h-[60px] w-full bg-white flex items-center justify-left">
                  <span className="ml-8">{room.roomName}</span>
                </div>
                {/* Check in */}
                <div className="h-[60px]">
                  <CheckIn
                    id="checkInDate2"
                    selectedDate={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                  />
                </div>
                {/* Check out */}
                <div className="h-[60px]">
                  <CheckOut
                    id="checkOutDate2"
                    selectedDate={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                  />
                </div>
                {/* Check guests */}
                <div className="h-[60px]">
                  <Guests
                    value={guest}
                    onChange={(value) => setGuest(value)}
                    id="guest2"
                  />
                </div>
                <button
                  type="submit"
                  className={
                    !isDatesNotNull
                      ? 'btn btn-lg btn-primary w-full py-2 pointer-events-none opacity-50'
                      : 'btn btn-lg btn-primary fw-full py-2'
                  }
                >
                  Book now form {room.price} THB
                </button>
              </div>
            </form>

            {/* Hotel Rules */}
            <div className="mt-4">
              <h3 className="h3 font-bold font-primary">Hotel Rules</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul className="mt-2">
                <li className="flex items-center gap-x-4">
                  <FaCheck /> Check-in: 3.00 PM - 9.00 PM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck /> Check-out: Before 12.00 AM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck /> No Pets, No Smoking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetail;
