// requestReducer.js
const initialState = {
  isLoading: false,  // Indicates whether a request is in progress
  lastRequest: false, // Stores information about the last request
  errorRequest: false
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_REQUEST':
      return {
        ...state,
        isLoading: true,
        lastRequest: false,
        errorRequest: false
      };
    case 'COMPLETE_REQUEST':
      return {
        ...state,
        errorRequest: false,
        isLoading: true,
        lastRequest: true,
      };
    case 'ERROR_REQUEST':
      return {
        ...state,
        errorRequest: true,
        isLoading: false,
        lastRequest: false,
      };
      case 'CLEAR_REQUEST':
        return {
          ...state,
          isLoading: false,
        lastRequest: false,
        errorRequest: false
        };
    default:
      return state;
  }
};

export default requestReducer;
