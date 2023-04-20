import { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

const adultOption = [
  { label: '1 Adult', value: 1 },
  { label: '2 Adults', value: 2 },
  { label: 'More...', value: 'X' },
];

const AdultDropdown = () => {
  const [adults, setAdults] = useState('2 Adults');

  useEffect(() => {
    // console.log(adults);
  }, [adults]);

  return (
    <Menu as="div" className="bg-white w-full h-full relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8 text-gray-400">
        {adults}
        <BsChevronDown className="text-base" />
      </Menu.Button>
      <Menu.Items
        as="ul"
        className="flex flex-col absolute bg-white w-full z-40 text-gray-400"
      >
        {adultOption.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => setAdults(item.label)}
              as="li"
              key={index}
              className="flex w-full h-12 border-b hover:bg-accent-hover
            hover:text-white items-center justify-center cursor-pointer"
            >
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default AdultDropdown;
