import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../toolkit/auth/authSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,

  },
})