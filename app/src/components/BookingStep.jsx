import { Link } from 'react-router-dom';

const BookingStep = ({ step1, step2, handleLogin }) => {
  return (
    <div className="flex justify-center mx-auto gap-x-8">
      <Link
        to="/login"
        onClick={!step1 ? (e) => e.preventDefault() : handleLogin}
        className={
          step1 ? 'text-blue-500' : 'disabled pointer-events-none opacity-50'
        }
      >
        Login
      </Link>

      <div
        // to="/checkout"
        // onClick={!step2 ? (e) => e.preventDefault() : null}
        className={
          step2 ? 'text-blue-500' : 'disabled pointer-events-none opacity-50'
        }
      >
        Deposit
      </div>
    </div>
  );
};

export default BookingStep;
