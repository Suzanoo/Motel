import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookingStep from '../components/BookingStep';
import { createNewBooking } from '../features/booking/bookingSlice';

const date = (d) => {
  const dateObj = new Date(d);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

  return `${dayOfWeek}:${day}-${month}-${year}`; // Output: "2023-5-1"
};

const BookingScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    for (const item of cart) {
      await dispatch(createNewBooking(item));
    }
  };

  return (
    <>
      <div className="bg-pink-200 w-full min-h-[760px]">
        <div className="flex flex-col justify-center items-center mb-8 py-24">
          {/* Check user status */}
          <div className="flex mx-auto justify-center ">
            {user ? (
              // if user: disable login button, enable checkout button
              <BookingStep step1={false} step2={true} />
            ) : (
              // if no: enable login button, disable checkout button
              <BookingStep step1={true} step2={false} />
            )}
          </div>

          <form onSubmit={onSubmit} className="flex flex-col">
            {/* Display user reserve */}
            <ul>
              <li className="py-2">
                <span className="font-bold text-[24px]">Your Reserve</span>
              </li>
              {cart.map((item, index) => {
                return (
                  <ul>
                    <li className="py-2">
                      <span className="font-bold text-[24px]">
                        Room:{index + 1}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">Room Type:</span> {item.name}
                    </li>
                    <li>
                      <span className="font-bold">Check In:</span>{' '}
                      {date(item.checkIn)}
                    </li>
                    <li>
                      <span className="font-bold">Check Out:</span>{' '}
                      {date(item.checkOut)}
                    </li>
                    <li>
                      <span className="font-bold">Guest:</span> {item.guest}
                    </li>
                  </ul>
                );
              })}
            </ul>

            {/* Payment method */}
            <span className="font-bold text-[24px] mt-4">
              Select payment method
            </span>
            <div className="mt-4">
              <label className="mr-2">
                <input
                  type="radio"
                  value="paypal"
                  checked={selectedOption === 'paypal'}
                  onChange={handleOptionChange}
                />
                <span className="ml-2">Paypal</span>
              </label>

              <label>
                <input
                  type="radio"
                  value="card"
                  checked={selectedOption === 'card'}
                  onChange={handleOptionChange}
                />
                <span className="ml-2">Credit Card</span>
              </label>
            </div>

            {/* Checkout  */}
            <button
              className={
                user
                  ? 'rounded mt-6 bg-primary text-white px-4 py-2 hover:bg-gray-600'
                  : 'rounded mt-6 bg-primary text-white px-4 py-2 disabled pointer-events-none opacity-50'
              }
            >
              Checkout Deposit 25%
            </button>
          </form>
          <div className="flex justify-center">
            <Link to="/login" className="text-blue-500 px-2">
              Login
            </Link>
            first. Don't have account?{' '}
            <Link to="/register" className="text-blue-500 px-2">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingScreen;
