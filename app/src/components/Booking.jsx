import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import AdultDropdown from './AdultDropdown';
import KidDropdown from './KidDropdown';

const Booking = () => {
  return (
    <form className="h-[300px] lg:h-[70px]">
      <div className="flex flex-col w-full h-full lg:flex-row">
        <div className="flex-1 border-r">
          <CheckIn />
        </div>
        <div className="flex-1 border-r">
          <CheckOut />
        </div>
        <div className="flex-1 border-r">
          <AdultDropdown />
        </div>
        <div className="flex-1 border-r">
          <KidDropdown />
        </div>
        <button className="btn btn-lg btn-primary flex-1 text-white h-full">
          Booking
        </button>
      </div>
    </form>
  );
};

export default Booking;
