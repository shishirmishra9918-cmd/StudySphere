import axios from 'axios';

const API_URL = 'http://localhost/api';

export const api = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login.php`, {
      email,
      password,
    });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/register.php`, {
      name,
      email,
      password,
    });
    return response.data;
  },

  // Resource endpoints
  uploadResource: async (formData: FormData) => {
    const response = await axios.post(`${API_URL}/resources/upload.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  searchResources: async (query: string) => {
    const response = await axios.get(`${API_URL}/resources/search.php?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};