// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import authService from './authService'; // Update the path if necessary

// Load user data from localStorage on initial state setup
const initialUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: initialUser || null,
  isAuthenticated: !!initialUser, // Set isAuthenticated based on initialUser
  loading: false,
  isCreated:false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCreated:(state,action)=>{
      state.isCreated=action.payload
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.isCreated=false
    },
  },
});

export const { setUser, logout, setLoading, setError,setCreated ,reset} = authSlice.actions;

export const logoutAsync = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(logout());
    // Remove user data from localStorage on logout
    localStorage.removeItem('user');
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loginAsync = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await authService.login(data);
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(setUser(user)); // Here, set the user directly
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const registerAsync = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setCreated(false));
    dispatch(setError(false))
    await authService.register(data);
    dispatch(setCreated(true)); // Here, set the user directly
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const restSlice=() => async (dispatch) =>{
  dispatch(reset())
}

export default authSlice.reducer;
