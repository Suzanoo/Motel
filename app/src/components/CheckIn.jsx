import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../public/css/datepicker.css';
import { BsCalendar } from 'react-icons/bs';

const CheckIn = ({ value, onChange }) => {
  return (
    <div className="relative flex items-center justify-end h-full">
      <div className="absolute z-10 pr-8">
        <div>
          <BsCalendar className="text-gemini text-base" />
        </div>
      </div>
      <DatePicker
        className="w-full h-full cursor-pointer"
        selected={value}
        placeholderText="Check in"
        onChange={(date) => onChange(date)}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default CheckIn;
