import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllRooms } from '../features/rooms/roomSlice';
import Rooms from '../components/Rooms';
import Booking from '../components/Booking';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  if (rooms.rooms === null) dispatch(getAllRooms());

  // Fetch rooms data on component mount
  useEffect(() => {
    dispatch(getAllRooms());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {rooms && <HeroSlider rooms={rooms} />}

      <div className="container mx-auto relative">
        <div
          className="bg-[#998d4d] mt-4 p-4 lg:shadow-xl lg:absolute 
        lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12"
        >
          <Booking />
        </div>
      </div>
      {rooms && <Rooms rooms={rooms} />}
    </>
  );
};

export default Home;
