import Rooms from '../components/Rooms';
import Booking from '../components/Booking';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <div className="container mx-auto relative">
        <div
          className="bg-gemini/20 mt-4 p-4 lg:shadow-xl lg:absolute 
        lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12"
        >
          <Booking />
        </div>
      </div>
      <Rooms />
    </>
  );
};

export default Home;
