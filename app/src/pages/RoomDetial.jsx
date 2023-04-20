import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';

import IconRender from '../components/IconRender';

import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import AdultDropdown from '../components/AdultDropdown';
import KidDropdown from '../components/KidDropdown';
import ScrollToTop from '../components/ScrollToTop';

const RoomDetail = () => {
  const store = useSelector((state) => state.rooms);
  const { slug } = useParams();

  const room = store.rooms.data.data.find((item) => {
    return item.slug === slug;
  });

  return (
    <section className="bg-orange-200 relative">
      <ScrollToTop />

      {/* banner */}
      <div className="flex flex-col relative justify-center items-center">
        <div className="mb-6">
          <img
            src={`${require(`../public/assets/img/${room.images}`)}`}
            alt=""
          />
        </div>
        {/* title */}
        <div className="relative z-20 text-accent text-3xl font-primary uppercase">
          {room.roomName} : {room.roomType}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row lg:flex-row h-full py-8 mx-8 mb-12">
          {/* left */}
          <div className="w-full h-full lg:w-[60%] mb-4 lg:mr-4">
            <h3 className="h3 font-bold font-primary">Stuff</h3>
            <p>{room.description}</p>
            {/* facilities */}
            <h3 className="h3 font-bold font-primary mt-4">Accesories</h3>
            <IconRender accessories={room.accessories} />
          </div>

          {/* right */}
          <div className="w-full h-full lg:w-[40%]">
            <div className="bg-accent/20 py-6 px-6">
              <div className="flex flex-col space-y-6">
                <h3 className="h3 font-bold font-primary">Your Reservation</h3>
                <div className="h-[60px]">
                  <CheckIn />
                </div>
                <div className="h-[60px]">
                  <CheckOut />
                </div>
                <div className="h-[60px]">
                  <AdultDropdown />
                </div>
                <div className="h-[60px]">
                  <KidDropdown />
                </div>
                <button className="btn btn-lg btn-primary w-full py-2">
                  Book now form {room.price} THB
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="h3 font-bold font-primary">Hotel Rules</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul className="mt-2">
                <li className="flex items-center gap-x-4">
                  <FaCheck /> Check-in: 3.00 PM - 9.00 PM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck /> Check-out: Before 12.00 AM
                </li>
                <li className="flex items-center gap-x-4">
                  <FaCheck /> No Pets, No Smoking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetail;
