// messageActions.js
export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
});

export const clearMessages = () => ({
    type: 'CLEAR_MESSAGES',
});

export const clearMessagesWithDelay = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(clearMessages());
            
        }, 2000); // 3000 milliseconds (3 seconds)
    };
};