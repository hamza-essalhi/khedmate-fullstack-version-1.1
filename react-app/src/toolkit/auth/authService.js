
import api from './config'


const authService = {
  login: async (data) => {
    try {
      const response = await api.post('auth/login',data);
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user
    } catch (error) {
      throw error;
    }
  },
  register: async (data) => {
    try {
      const response = await api.post(`auth/register`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.post(`auth/logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
