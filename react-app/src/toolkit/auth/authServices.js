import axios from 'axios'





const signUp = async (data) => {
  
}


const login = async (data) => {
  
}

const logout = async () => {
  try {
    // Clear auth state from local storage
    localStorage.removeItem('authState');
    
    // Make API call to log out
    await api.post('auth/logout');
    
    // Additional steps if needed (e.g., clearing additional auth-related data)

    // Navigate after logout
    // Redirect or perform other navigation logic
  } catch (error) {
    // Handle errors more explicitly (e.g., show an error message to the user)
    console.error('Logout error:', error);
    throw error; // Rethrow the error if needed
  }
};

const logoutFunc = async () => {
  try {
    await dispatch(logout());
    // Perform any additional actions after successful logout
  } catch (error) {
    // Handle errors here if needed
    console.error('LogoutFunc error:', error);
  }
};


const authService = {
  signUp,
  login,
  logout,
}

export default authService