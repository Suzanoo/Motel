import { useEffect, useState } from 'react';

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
        header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'
      } fixed z-50 w-full transition-all duration-300`}
    >
      <div className="flex justify-between container mx-auto">
        {/* Logo */}
        <a href="/">{header ? 'Logo Dark' : 'Logo White'}</a>

        {/* Nav */}
        <nav
          className={`${
            header ? 'text-gemini' : 'text-white'
          } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
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
