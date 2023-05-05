/* eslint-disable */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

/**
 * Login from any page then after finish login process, ho to back to that page?
 * 1.Create a function to store the current location in local storage
 * 2.Modify the login link in the header to pass the current location as a state:
 * 3.In the Login component, get the previous location from the state passed by the link:
 * 4.Call the setPrevLocation function in the Login component:
 */
/*


 store the previous location before navigating to the login page 
 and then redirect the user back to that location after a successful login
*/

function Login() {
  const initialState = {
    email: '',
    password: '',
  };

  const [formValue, setformValue] = useState(initialState);
  const { email, password } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Previous location configuration
  const [prevLocation, setPrevLocation] = useState(null);

  // Get previous location
  useEffect(() => {
    setPrevLocation(window.localStorage.getItem('prevLocation'));
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Wrong email or password');
    }

    // Redirect to previous location or home page
    if (isSuccess) {
      const location = prevLocation ? prevLocation : '/';
      window.localStorage.removeItem('prevLocation');
      navigate(location);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setformValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (el) => {
    el.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData)); // update state
  };

  if (isLoading)
    return (
      <>
        <div className="flex items-center justify-center space-x-2">
          <div
            id="spinner"
            className=" hidden h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
              border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      </>
    );

  // 5).
  return (
    <div className="flex justify-center mx-auto py-24 bg-pink-200 h-[760px]">
      <div className="flex-col w-2/3 mt-20">
        <form
          className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder=""
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder=""
              onChange={onChange}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="baseline text-white bg-primary hover:scale-110
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <Link to="/forgot-pwd" className="pl-8 text-blue-500">
              Forget Password!
            </Link>
          </div>
          <div className="mt-4">
            Don't have account?{' '}
            <Link to="/register" className="pl-4 text-blue-500 text-sm">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
