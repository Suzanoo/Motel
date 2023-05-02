import axios from 'axios';

const API_URL = 'api/v1/rooms';

// Get All
const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL + '/');
    if (response.data) {
      localStorage.setItem('products', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Create new product
const createNewProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL + '/', productData, {
      withCredentials: true, // To include cookies in Axios requests
    });
    if (response.data);
  } catch (error) {
    console.error(error);
  }
};

// Update product (Bypass)
const updateProduct = async (id, productData) => {
  try {
    const response = await axios.patch(
      // use absolute path instead of relative path
      `http://localhost:3001/api/v1/rooms/${id}`,
      productData,
      {
        withCredentials: true, // To include cookies in Axios requests to get auth token
      }
    );
    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete product
const deleteProduct = async (id) => {
  try {
    await axios.delete(
      // use absolute path instead of relative path
      `http://localhost:3001/api/v1/rooms/${id}`,
      {
        withCredentials: true, // To include cookies in Axios requests to get auth token
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// Create services
const productService = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
