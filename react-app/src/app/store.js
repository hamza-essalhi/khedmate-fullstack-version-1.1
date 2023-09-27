import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from '../toolkit/auth/authSlice'
import messageReducer from '../toolkit/messages/messageReducer';
import requestReducer from '../toolkit/request/requestReducer';
import notificationReducer from '../toolkit/notification/notificationReducer';
import chatNotificationReducer from '../toolkit/chatNotification/chatNotificationReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    request: requestReducer,
    notification: notificationReducer,
    chatNotification: chatNotificationReducer,

    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['request.lastRequest.headers'],
      },
    }),
  },
})