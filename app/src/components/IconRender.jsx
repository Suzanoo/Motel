import {
  FaWifi,
  FaUtensils,
  FaBath,
  FaSwimmingPool,
  FaDumbbell,
} from 'react-icons/fa';

const IconRender = ({ accessories }) => {
  // Icon setup to display
  const wifiIcon = <FaWifi className="inline-block" />;
  const breakfastIcon = <FaUtensils className="inline-block" />;
  const bathIcon = <FaBath className="inline-block" />;
  const swimmingIcon = <FaSwimmingPool className="inline-block" />;
  const gymIcon = <FaDumbbell className="inline-block" />;

  // Mapping
  const accessoriesIcons = {
    wifi: { name: 'Wifi', icon: wifiIcon },
    breakfast: { name: 'Breakfast', icon: breakfastIcon },
    bath: { name: 'Bath', icon: bathIcon },
    swimming: { name: 'Swimming', icon: swimmingIcon },
    gym: { name: 'Gym', icon: gymIcon },
  };

  // Render icons
  const renderAccessories = () => {
    const enabledAccessories = Object.entries(accessories)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        const accessory = accessoriesIcons[key];
        return (
          <div key={key} className="flex">
            <span className="mr-4 font-bold">{accessory.icon}</span>
            <span>{accessory.name}</span>
          </div>
        );
      });

    return <div className="grid grid-cols-2 gap-4">{enabledAccessories}</div>;
  };

  // Return
  return renderAccessories();
};

export default IconRender;
