import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { deleteRoom, getAllRooms } from '../features/rooms/roomSlice';
import '../public/css/table.scss';

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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      dispatch(deleteRoom(id));
      navigate('/admin');
    }
  };

  const handleUpdateTable = () => {
    dispatch(getAllRooms());
    setRooms(JSON.parse(localStorage.getItem('rooms')));

    const searchText = document
      .querySelector('.product-table input')
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
    <div className="product-table flex flex-col mx-auto justify-center min-w-[640px]">
      <h1 className="font-bold">Rooms</h1>
      <div className="py-4">
        <input
          type="text"
          className="p-2 rounded"
          placeholder="Filter..."
          onChange={handleFilter}
        />
      </div>

      <table className="rwd-table" key={JSON.stringify(rooms)}>
        <thead>
          <tr>
            <th onClick={() => handleSort('roomName')}>
              Name {sortIcon('roomName')}
            </th>
            <th onClick={() => handleSort('roomType')}>
              Type {sortIcon('roomType')}
            </th>
            <th onClick={() => handleSort('price')}>
              Price {sortIcon('price')}
            </th>

            <th>Detail</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((room) => (
            <tr key={room._id}>
              <td>{room.roomName}</td>
              <td>{room.roomType}</td>
              <td>{`${room.price}.THB`}</td>
              <td>
                <button
                  className="detailBtn"
                  onClick={() => handleDetail(room.slug)}
                >
                  Detail
                </button>
              </td>
              <td>
                <button
                  className="updateBtn"
                  onClick={() => handleUpdate(room._id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="deleteBtn"
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
  );
};

export default Table;
