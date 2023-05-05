import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCartArrowDown } from 'react-icons/fa';
import { logout, reset } from '../features/auth/authSlice';

import logo from '../public/assets/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [header, setHeader] = useState(false);

  // Listning header
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

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
            header ? 'text-primary' : 'text-white'
          } hidden lg:flex gap-x-2 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px]
           items-center uppercase `}
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

        {/* cart, login */}
        <div
          className={`${
            header ? 'text-primary' : 'text-white'
          } flex gap-x-2 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase `}
        >
          <Link to="/booking">
            <FaCartArrowDown />
          </Link>

          {!user ? (
            <Link
              to={{
                pathname: '/login',
              }}
            >
              login
            </Link>
          ) : (
            <Link onClick={handleLogout}>logout</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
