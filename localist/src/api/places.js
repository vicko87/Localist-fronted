
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/places`;

export const getPlaces = (token) => axios.get(API_URL, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});
export const createPlace = (data, token) =>
  axios.post(API_URL, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

export const updatePlace = (id, data, token) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

export const deletePlace = (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });