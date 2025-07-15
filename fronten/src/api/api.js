import axios from 'axios';

const API_URL = 'https://leaderboard-task-k1lx.onrender.com/api/users';

export const getAllUsers = () => axios.get(API_URL);
export const createUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const getUserById = (id, token) => axios.get(`${API_URL}/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});
export const updateUser = (id, userData, token) => axios.put(`${API_URL}/${id}`, userData, {
  headers: { Authorization: `Bearer ${token}` },
});
export const deleteUser = (id, token) => axios.delete(`${API_URL}/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});


export const claimPoints = (userId) => axios.post(`https://leaderboard-task-k1lx.onrender.com/api/users/${userId}/claim`);
export const getUserHistory = (userId) => axios.get(`https://leaderboard-task-k1lx.onrender.com/api/history/${userId}`);
