import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../public/assets/img/logo.png';

const Header = () => {
  const [header, setHeader] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });

  return (
    <header
      className={`${
        header ? 'bg-white py-4 shadow-lg' : 'bg-transparent py-6'
      } fixed z-50 w-full transition-all duration-300`}
    >
      <div className="flex justify-between container mx-auto gap-x-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="" className="hover:scale-110" />
        </Link>

        {/* Nav */}
        <nav
          className={`${
            header ? 'text-gemini' : 'text-white'
          } flex gap-x-2 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase `}
        >
          <a href="/" className="hover:text-orange-400 transition">
            Home
          </a>
          <a href="/" className="hover:text-orange-400 transition">
            Rooms
          </a>
          <a href="/" className="hover:text-orange-400 transition">
            Sport
          </a>
          <a href="/" className="hover:text-orange-400 transition">
            Products
          </a>
          <a href="/" className="hover:text-orange-400 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
