import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  updateProduct,
  reset,
  getAllProducts,
} from '../features/product/productSlice';

function UpdateProduct() {
  // Configuration:
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.products
  );

  const initialState = {
    name: '',
    duration: '',
    maxGroupSize: '',
    difficulty: '',
    price: '',
    summary: '',
    description: '',
    imageCover: '',
  };

  const [formData, setFormData] = useState(initialState);

  // Fetch data depend on user click from table first:
  useEffect(() => {
    const productData = products.data.data.find((t) => t._id === id);
    if (productData) {
      setFormData(productData);
    }
  }, [products, id]);

  // Assign form fields
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

  // Events handlers:
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
    }
  }, [isSuccess, isError, message, dispatch, navigate]);

  const handleChange = (el) => {
    setFormData((prevState) => ({
      ...prevState,
      [el.target.name]: el.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Fetch values from form
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

    try {
      await dispatch(updateProduct({ id, productData }));
      navigate('/home');
      dispatch(getAllProducts('http://localhost:3000/api/v1/products'));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div class="spinner"></div>;

  return (
    <>
      <section className="heading">
        <p>Update product</p>
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
            <label htmlFor="roomType"></label>
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

export default UpdateProduct;
