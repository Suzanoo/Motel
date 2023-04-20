import { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

const kidOption = [
  { label: 'No Kids', value: 0 },
  { label: '1 Kids', value: 1 },
  { label: '2 Kids', value: 2 },
  { label: 'More...', value: 'X' },
];

const KidDropdown = () => {
  const [kids, setKids] = useState('No Kids');

  useEffect(() => {
    // console.log(kids);
  }, [kids]);

  return (
    <Menu as="div" className="bg-white w-full h-full relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8 text-gray-400">
        {kids}
        <BsChevronDown className="text-base" />
      </Menu.Button>
      <Menu.Items
        as="ul"
        className="flex flex-col absolute bg-white w-full z-40 text-gray-400"
      >
        {kidOption.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => setKids(item.label)}
              as="li"
              key={index}
              placeholder="Kids"
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

export default KidDropdown;
