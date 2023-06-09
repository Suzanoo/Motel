import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

/**
 * Register
 * Login
 * Logout
 * Forgot password
 * Reset password
 * User profile
 * Update profile picture
 */

// Fetch user from localStorage & cast to JSON object
const user = JSON.parse(localStorage.getItem('user'));

// Initialize state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register
export const register = createAsyncThunk(
  // async action type
  'user/register',
  // function return payload
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  // async action type
  'user/login',
  // function return payload
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logout = createAsyncThunk('user/logout', async () => {
  await authService.logout();
});

// Forgot password
export const forgotPwd = createAsyncThunk(
  // async action type
  'user/forgotPwd',
  // function return payload
  async (user, thunkAPI) => {
    try {
      return await authService.forgotPwd(user);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset password
export const resetPwd = createAsyncThunk(
  // async action type
  'user/resetPwd',
  // function return payload
  async (data, thunkAPI) => {
    try {
      return await authService.resetPwd(data);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// User profile
export const getUser = createAsyncThunk(
  // async action type
  'user/getUser',
  // function return payload
  async (id, thunkAPI) => {
    try {
      return await authService.getUser(id);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update profile picture
export const updateProfilePicture = createAsyncThunk(
  'user/updateProfilePicture',
  async (formData, thunkAPI) => {
    try {
      return await authService.updateProfilePicture(formData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create slice
export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  // Manage payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(forgotPwd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPwd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(forgotPwd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetPwd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPwd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(resetPwd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.booking = null;
        state.cart = null;
      });
  },
});

// Export actions, reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;
