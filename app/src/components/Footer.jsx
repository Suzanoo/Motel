// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../public/assets/logo.png';

const Footer = () => {
  return (
    <footer className=" bg-primary bottom-0 w-full py-3">
      <div className="flex container mx-auto text-white justify-between items-center">
        <Link to="/">
          <img src={logo} alt="" className="hover:scale-110" />
        </Link>
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
