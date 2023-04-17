import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllRooms } from '../features/rooms/roomSlice';
import Room from './Room';

const Rooms = () => {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  rooms.rooms === null ? dispatch(getAllRooms()) : console.log('');

  // Fetch rooms data on component mount
  useEffect(() => {
    dispatch(getAllRooms());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className="">
      <div className="container mx-auto">
        {/* grid */}
        <div
          className="grid grid-cols-1 max-w-sm mx-auto gap-[30px]
        lg:grid-cols-3 lg:max-w-none lg:mx-0"
        >
          {rooms.rooms != null
            ? rooms.rooms.data.data.map((room) => {
                return <Room room={room} key={room.roomNumber} />;
              })
            : console.log('No rooms data in local storage')}
          {}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
