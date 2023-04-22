import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import { deleteProduct } from '../features/product/productSlice';

import '../public/css/table.scss';

import React from 'react';

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('products'))
  );
  const [sortType, setSortType] = useState('asc');
  const [sortedBy, setSortedBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState(products.data.data);

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
    const filteredProducts = products.data.data.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText) ||
        product.price.toString().includes(searchText) ||
        product.duration.toString().includes(searchText) ||
        product.startDates[0].includes(searchText)
    );
    setFilteredProducts(filteredProducts);
  };

  const sortIcon = (field) => {
    if (sortedBy === field) {
      return sortType === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      await dispatch(deleteProduct(id));
    }
  };

  const handleUpdateTable = () => {
    setProducts(JSON.parse(localStorage.getItem('products')));
    const searchText = document
      .querySelector('.product-table input')
      .value.toLowerCase();
    const filteredProducts = products.data.data.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText) ||
        product.price.toString().includes(searchText) ||
        product.duration.toString().includes(searchText) ||
        product.startDates[0].includes(searchText)
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="product-table">
      <input type="text" placeholder="Filter..." onChange={handleFilter} />

      <table className="rwd-table" key={JSON.stringify(products)}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortIcon('name')}</th>
            <th onClick={() => handleSort('price')}>
              Price {sortIcon('price')}
            </th>
            <th onClick={() => handleSort('duration')}>
              Duration {sortIcon('duration')}
            </th>
            <th onClick={() => handleSort('startDates')}>
              Date {sortIcon('startDates')}
            </th>
            <th>Detail</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{`$${product.price}`}</td>
              <td>{`${product.duration} days`}</td>
              <td>{product.startDates[0].split('T')[0]}</td>
              <td>
                <button
                  className="detailBtn"
                  onClick={() => handleDetail(product._id)}
                >
                  Detail
                </button>
              </td>
              <td>
                <button
                  className="updateBtn"
                  onClick={() => handleUpdate(product._id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <button className="refreshBtn" onClick={handleUpdateTable}>
          Refresh Table
        </button>
      </table>
    </div>
  );
};

export default Table;
