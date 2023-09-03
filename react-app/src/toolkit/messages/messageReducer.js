// messageReducer.js
const initialState = {
    messages: [],
  };
  
  const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      case 'CLEAR_MESSAGES':
        return {
          ...state,
          messages: [],
        };
      default:
        return state;
    }
  };
  
  export default messageReducer;
  