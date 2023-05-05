import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import BookingStep from '../components/BookingStep';
import {
  createNewBooking,
  reset,
  resetBooking,
} from '../features/booking/bookingSlice';

import { resetCart } from '../features/cart/cartSlice';

const date = (d) => {
  const dateObj = new Date(d);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

  return `${dayOfWeek}:${day}-${month}-${year}`; // Output: "2023-5-1"
};

const BookingScreen = () => {
  // Variable
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State init
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { booking, isError, isSuccess, message } = useSelector(
    (state) => state.booking
  );
  const [payment, setPayment] = useState('paypal');

  // Listen for booking
  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong');
    }

    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [booking, isError, isSuccess, message, navigate, dispatch]);

  // Listen for radio buttons
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  // Store current location before navigating to login page
  const handleLogin = () => {
    window.localStorage.setItem('prevLocation', '/booking');
    navigate('/login');
  };

  const handleEdit = () => {
    window.alert('Next implementation');
  };

  // Booking
  const onSubmit = async (e) => {
    e.preventDefault();

    const carts = {
      cart: cart,
      payment: payment,
    };

    for (const item of carts.cart) {
      try {
        await dispatch(resetBooking());
        await dispatch(createNewBooking(item));
        await dispatch(resetCart());
      } catch (error) {
        console.error(error);
        window.alert('Failed');
      }
    }
    window.alert('Next step: Checkout method');
  };

  return (
    <>
      <div className="bg-pink-200 w-full min-h-[760px]">
        <div className="flex flex-col justify-center items-center py-24">
          {/* Check user status */}
          <div className="flex mx-auto justify-center py-4">
            {user ? (
              // if user: disable login button, enable checkout button
              <BookingStep step1={false} step2={true} />
            ) : (
              // if no: enable login button, disable checkout button
              <BookingStep
                step1={true}
                step2={false}
                handleLogin={handleLogin}
              />
            )}
          </div>

          <form className="flex flex-col">
            {/* Display user reserve */}
            <div>
              <span className="font-bold text-[20px]">Your Reserve</span>
              {cart &&
                cart.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li className="py-2">
                        <span className="font-bold text-[18px]">
                          Room:{index + 1}
                        </span>
                      </li>
                      <li>
                        <span className="font-semibold">Room Type:</span>{' '}
                        {item.name}
                      </li>
                      <li>
                        <span className="font-semibold">Check In:</span>{' '}
                        {date(item.checkIn)}
                      </li>
                      <li>
                        <span className="font-semibold">Check Out:</span>{' '}
                        {date(item.checkOut)}
                      </li>
                      <li>
                        <span className="font-semibold">Guest:</span>{' '}
                        {item.guest}
                      </li>
                    </ul>
                  );
                })}
            </div>

            {/* Payment method */}
            <span className="font-bold text-[20px] mt-4">
              Select payment method
            </span>
            <div className="mt-4">
              <label className="mr-2">
                <input
                  type="radio"
                  name="paypal"
                  value="paypal"
                  checked={payment === 'paypal'}
                  onChange={handlePayment}
                />
                <span className="ml-2">Paypal</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="card"
                  value="card"
                  checked={payment === 'card'}
                  onChange={handlePayment}
                />
                <span className="ml-2">Credit Card</span>
              </label>
            </div>

            {/* Edit && Checkout  */}
            <div className="flex gap-x-4">
              <button
                onClick={handleEdit}
                className="rounded mt-6 bg-blue-400 text-white px-4 py-2 hover:bg-blue-200"
              >
                Edit
              </button>

              <button
                onClick={onSubmit}
                className={
                  user && (cart && cart.length) > 0
                    ? 'rounded mt-6 bg-blue-400 text-white px-4 py-2 hover:bg-blue-200'
                    : 'rounded mt-6 bg-blue-400 text-white px-4 py-2 disabled pointer-events-none opacity-50'
                }
              >
                Deposit 25%
              </button>
            </div>
          </form>

          {/* Register  */}
          <div className="flex justify-center py-4">
            Don't have account?{' '}
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
