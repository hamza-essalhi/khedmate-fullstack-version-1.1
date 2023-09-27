// requestReducer.js
const initialState = {
  isChatNotification: false,  // Indicates whether a request is in progress
  chatNotificationCounter: 0,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        isChatNotification: true,
        chatNotificationCounter: action.payload
      };
      case 'CLEAR_NOTIFICATION':
        return {
          ...state,
          isChatNotification: false,
        chatNotificationCounter: 0
        };
    default:
      return state;
  }
};

export default requestReducer;
