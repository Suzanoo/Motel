import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../public/css/datepicker.css';
import { BsCalendar } from 'react-icons/bs';

const CheckOut = () => {
  const [checkOutDate, setCheckOutDate] = useState(false);
  return (
    <div className="relative flex items-center justify-end h-full">
      <div className="absolute z-10 pr-8">
        <div>
          <BsCalendar className="text-gemini text-base" />
        </div>
      </div>
      <DatePicker
        className="w-full h-full cursor-pointer"
        selected={checkOutDate}
        placeholderText="Check out"
        onChange={(date) => setCheckOutDate(date)}
      />
    </div>
  );
};

export default CheckOut;
