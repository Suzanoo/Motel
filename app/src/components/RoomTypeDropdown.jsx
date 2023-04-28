import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

const RoomType = ({ rooms, value, onChange }) => {
  const options = rooms.rooms.data.data.map((room, index) => ({
    label: room.roomName,
    value: index + 1,
  }));

  const [selectedOption, setSelectedOption] = useState(value);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <Menu as="div" className="bg-white w-full h-full relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8 text-gray-400">
        {selectedOption}
        <BsChevronDown className="text-base" />
      </Menu.Button>
      <Menu.Items
        as="ul"
        className="flex flex-col absolute bg-white w-full z-40 text-gray-400"
      >
        {options.map((item, index) => {
          return (
            <Menu.Item
              onClick={() => {
                handleSelect(item.label);
              }}
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

export default RoomType;
