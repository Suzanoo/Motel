import { useState, useEffect } from 'react';
import logo from '../assets/img/logo.png';

const Footer = () => {
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setFooter(true) : setFooter(false);
    });
  });

  return (
    <footer
      className={`${
        footer ? 'bg-primary' : 'bg-transparent'
      } fixed bottom-0  w-full`}
    >
      <div className="flex container mx-auto text-white justify-between items-center">
        <img src={logo} alt="" className="" />
        <div>
          <span className="text-[20px]">©</span>2023. All rights reservered.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
