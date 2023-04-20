// import { useState, useEffect } from 'react';
import logo from '../public/assets/img/logo.png';

const Footer = () => {
  // const [footer, setFooter] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     window.scrollY > 50 ? setFooter(true) : setFooter(false);
  //   });
  // });

  return (
    <footer className=" bg-primary bottom-0 w-full py-3">
      <div className="flex container mx-auto text-white justify-between items-center">
        <img src={logo} alt="" className="hover:scale-110" />
        <div>
          Copyright
          <span className="font-tertiary tracking-[3px] text-[15px]">©</span>
          2023. All rights reservered.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
