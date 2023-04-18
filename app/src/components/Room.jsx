import { Link } from 'react-router-dom';
import { BsArrowsFullscreen, BsPeople } from 'react-icons/bs';
import StarRating from './StarRating';

const Room = ({ room }) => {
  return (
    <div className="bg-white shadow-2xl min-h-[400px] group">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          className="group-hover:scale-110 transition-all duration-300 w-full"
          src={`${require(`../assets/img/${room.images[0]}`)}`}
          alt=""
        />
      </div>
      {/* Rating */}
      <div
        className="bg-white shadow-lg max-w-[300px] mx-auto h-[45px] 
      flex justify-center items-center -translate-y-1/2 gap-x-2"
      >
        <div>Rating: {room.ratingAverage}</div>
        <StarRating rating={room.ratingAverage} />
      </div>
      {/* Description */}
      <div className="text-center">
        <Link to={`/room/${room.slug}`}>
          <h3 className="h3 text-gemini hover:text-orange-400 font-semibold">
            {room.roomName}
          </h3>
        </Link>
        <p className="max-w-[300px] mx-auto text-[14px] mb-4">
          {room.description}
        </p>
      </div>
      {/* Btn */}
      <div className="bg-gemini hover:bg-gray-500  w-[80%] h-[40px] mx-auto flex justify-center items-center mb-2">
        <Link
          to={`/room/${room.slug}`}
          className="text-white hover:text-orange-400"
        >
          Book now from ${room.price}
        </Link>
      </div>
    </div>
  );
};

export default Room;
