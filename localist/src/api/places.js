
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/places';

export const getPlaces = () => axios.get(API_URL);
export const createPlace = (data, token) =>
  axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });