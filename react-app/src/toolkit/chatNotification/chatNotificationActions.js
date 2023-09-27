// Corrected action types
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

// Action creators with the corrected action types
export const setChatNotification = (counter) => ({
  type: SET_NOTIFICATION,
  payload: counter, // You can include the payload if needed
});

export const clearChatNotification = () => ({
  type: CLEAR_NOTIFICATION,
});