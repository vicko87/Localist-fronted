import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);