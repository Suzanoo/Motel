import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { EffectFade, Autoplay } from 'swiper';

const HeroSlider = ({ rooms }) => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={'fade'}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[300px] lg:h-[550px]"
    >
      {rooms.rooms.data.data.map((item, index) => {
        return (
          <SwiperSlide
            className="relative flex justify-center items-center h-full "
            key={index}
          >
            <div className="z-20 justify-center items-center text-white text-center ">
              <div className="font-tertiary tracking-[6px] text-[24px] uppercase mb-2">
                Welcome and enjoy your vacation.
              </div>
              <button className="btn btn-sm btn-primary h-[45px] mx-auto font-tertiary tracking-[6px] uppercase">
                see our room
              </button>
            </div>

            <div className="absolute top-0 w-full h-full">
              <img
                className="object-cover w-full h-full"
                src={`${require(`../assets/img/${item.images[0]}`)}`}
                alt=""
              />
            </div>
            {/* Overlay */}
            {/* <div className="absolute w-full h-full bg-black/50"></div> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
