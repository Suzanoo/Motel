import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  createNewProduct,
  getAllProducts,
  reset,
} from '../features/product/productSlice';

function CreateNewProduct() {
  // 1).Initial state
  const initial = {
    roomName: '',
    roomNumber: '',
    roomType: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    accessories: [],
    roomSize: '',
    maxPerson: 2,
    price: '',
    priceDiscount: 0,
    images: '',
  };

  // 2).Configure form fields
  const [formData, setFormData] = useState(initial);
  const {
    roomName,
    roomNumber,
    roomType,
    description,
    accessories,
    roomSize,
    maxPerson,
    price,
    priceDiscount,
    images,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 3).Access store
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );

  // 4).Events handlers
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      // navigate('/');
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const productData = {
      roomName,
      roomNumber,
      roomType,
      description,
      // accessories,
      roomSize: +roomSize,
      maxPerson: +maxPerson,
      price: +price,
      priceDiscount: +priceDiscount,
      images,
    };
    dispatch(createNewProduct(productData));
    navigate('/home');
    dispatch(getAllProducts());
  };

  if (isLoading) return <div className="spinner"></div>;

  //5).JSX Rendering
  return (
    <>
      <section className="heading">
        <p>Create New Product</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="roomName">Name</label>
            <input
              className="form-control"
              type="text"
              name="roomName"
              value={roomName}
              onChange={handleChange}
            />
          </div>
          {/* Room Number */}
          <div className="form-group">
            <label htmlFor="roomNumber">Room Number</label>
            <input
              className="form-control"
              type="text"
              name="roomNumber"
              value={roomNumber}
              onChange={handleChange}
            />
          </div>
          {/* Room Type */}
          <div className="form-group">
            <label htmlFor="roomType">Room Type</label>
            <select name="roomType" value={roomType} onChange={handleChange}>
              <option value="">--Choose...--</option>
              {['sea view', 'delux', 'suit', 'middle age'].map(
                (option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          </div>
          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          {/* Accessories */}

          {/* Room Size */}
          <div className="form-group">
            <label htmlFor="roomSize">Room Size</label>
            <input
              className="form-control"
              type="number"
              name="roomSize"
              value={roomSize}
              onChange={handleChange}
            />
          </div>
          {/* Max Guests */}
          <div className="form-group">
            <label htmlFor="maxPerson">Max Guest</label>
            <input
              className="form-control"
              type="number"
              name="maxPerson"
              value={maxPerson}
              onChange={handleChange}
            />
          </div>
          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </div>
          {/* Price Discount*/}
          <div className="form-group">
            <label htmlFor="priceDiscount">Price Discount</label>
            <input
              className="form-control"
              type="number"
              name="priceDiscount"
              value={priceDiscount}
              onChange={handleChange}
            />
          </div>
          {/* Images */}
          <div className="form-group">
            <label htmlFor="imageCover">Images</label>
            <input
              type="text"
              name="images"
              value={images}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateNewProduct;
