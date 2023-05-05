import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import {
  deleteRoom,
  getAllRooms,
  resetRooms,
} from '../features/rooms/roomSlice';

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState(JSON.parse(localStorage.getItem('rooms')));

  const [sortType, setSortType] = useState('asc');
  const [sortedBy, setSortedBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState(rooms.data.data);

  const handleSort = (field) => {
    const isAsc = sortType === 'asc';
    setSortType(isAsc ? 'desc' : 'asc');
    setSortedBy(field);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[field] < b[field]) {
        return isAsc ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const handleFilter = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredProducts = rooms.data.data.filter(
      (room) =>
        room.roomName.toLowerCase().includes(searchText) ||
        room.roomType.toLowerCase().includes(searchText) ||
        room.price.toString().includes(searchText)
    );
    setFilteredProducts(filteredProducts);
  };

  const sortIcon = (field) => {
    if (sortedBy === field) {
      return sortType === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleDetail = (slug) => {
    navigate(`/room/${slug}`);
  };

  const handleUpdate = (id) => {
    navigate(`/update-room/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      await dispatch(deleteRoom(id));
      await dispatch(resetRooms());
      await dispatch(getAllRooms());
      navigate('/admin');
    }
  };

  const handleUpdateTable = () => {
    dispatch(getAllRooms());
    setRooms(JSON.parse(localStorage.getItem('rooms')));

    const searchText = document
      .querySelector('.room-table input')
      .value.toLowerCase();
    const filteredProducts = rooms.data.data.filter(
      (room) =>
        room.roomName.toLowerCase().includes(searchText) ||
        room.roomType.toLowerCase().includes(searchText) ||
        room.price.toString().includes(searchText)
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      <div className="room-table overflow-x-auto mx-6 lg:mx-auto">
        <h1 className="font-bold">Rooms</h1>
        <div className="py-4">
          <input
            type="text"
            className="p-2 rounded"
            placeholder="Filter..."
            onChange={handleFilter}
          />
        </div>

        <table
          className="min-w-full border border-gray-300 divide-y divide-gray-300"
          key={JSON.stringify(rooms)}
        >
          <thead className="bg-gray-5">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort('roomName')}
              >
                Name {sortIcon('roomName')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort('roomType')}
              >
                Type {sortIcon('roomType')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => handleSort('price')}
              >
                Price {sortIcon('price')}
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Detail
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Update
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {filteredProducts.map((room) => (
              <tr key={room._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {room.roomName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {room.roomType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${room.price}.THB`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-blue-500"
                    onClick={() => handleDetail(room.slug)}
                  >
                    Detail
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-yellow-500"
                    onClick={() => handleUpdate(room._id)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(room._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex py-4">
          <button
            className="bg-blue-400 text-white p-2 rounded hover:scale-110"
            onClick={handleUpdateTable}
          >
            Refresh Table
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
