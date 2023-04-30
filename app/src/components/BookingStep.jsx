import { Link } from 'react-router-dom';

const BookingStep = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center mx-auto gap-x-8">
      <Link
        to="/login"
        onClick={!step1 ? (e) => e.preventDefault() : null}
        className={step1 ? '' : 'disabled pointer-events-none opacity-50'}
      >
        Login
      </Link>

      <Link
        to="/checkout"
        onClick={!step2 ? (e) => e.preventDefault() : null}
        className={step2 ? '' : 'disabled pointer-events-none opacity-50'}
      >
        Checkout Deposit
      </Link>
    </div>
  );
};

export default BookingStep;
