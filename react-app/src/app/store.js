import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from '../toolkit/auth/authSlice'
import messageReducer from '../toolkit/messages/messageReducer';
import requestReducer from '../toolkit/request/requestReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    request: requestReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['request.lastRequest.headers'],
      },
    }),
  },
})