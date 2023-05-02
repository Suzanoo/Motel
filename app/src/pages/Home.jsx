import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllRooms } from '../features/rooms/roomSlice';
import Rooms from '../components/Rooms';
import Booking from '../components/BookingForm';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  // First fetch data on component mount
  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  return (
    <>
      {rooms && <HeroSlider rooms={rooms} />}

      <div className="container mx-auto relative mb-8">
        <div
          className="bg-[#998d4d] mt-4 p-4 lg:shadow-xl lg:absolute 
        lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12"
        >
          {rooms && <Booking rooms={rooms} />}
        </div>
      </div>
      {rooms && <Rooms rooms={rooms} />}
    </>
  );
};

export default Home;
