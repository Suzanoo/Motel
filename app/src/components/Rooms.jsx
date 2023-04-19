import Room from './Room';

const Rooms = ({ rooms }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto lg:px-0 lg:mb-2">
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