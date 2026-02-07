import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const JsonPlaceholderService = {
  getPosts: async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  getPost: async (id: number) => {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  },

  createPost: async (post: { title: string; body: string; userId: number }) => {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  },

  updatePost: async (id: number, post: { title?: string; body?: string; userId?: number }) => {
    const response = await axios.put(`${API_URL}/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    return response.data;
  },
};
