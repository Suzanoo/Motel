// @desc    Add products into cart
// @access  User
const addToCart = async (reserve) => {
  try {
    // Get cart from localStorage or create new cart if it doesn't exist
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add reserve to cart
    cart.push(reserve);

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);

    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Error adding to cart');
  }
};

const fetchCart = () => {
  try {
    // Get cart from localStorage or create new cart if it doesn't exist
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    return cart;
  } catch (error) {
    console.error('Error fetch cart:', error);
    throw new Error('Error fetch cart');
  }
};

const cartService = {
  fetchCart,
  addToCart,
};

export default cartService;
