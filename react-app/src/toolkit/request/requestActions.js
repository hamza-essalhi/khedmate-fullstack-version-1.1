// requestActions.js
export const startRequest = () => ({
    type: 'START_REQUEST',
  });
  
  export const completeRequest = () => ({
    type: 'COMPLETE_REQUEST',
  });
  
  export const errorRequests = () => ({
    type: 'ERROR_REQUEST',
  });

  export const clearRequest = () => ({
    type: 'CLEAR_REQUEST',
});

  export const clearRequestWithDelay = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(clearRequest());
            
        }, 500); // 3000 milliseconds (3 seconds)
    };
};