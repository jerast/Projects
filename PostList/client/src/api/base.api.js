import axios from 'axios'

const API_URL = 'http://localhost:4000/api';

export const getBaseRequest = async () => 
    await axios.get(`${API_URL}/base`);

export const createBaseRequest = async () => 
    await axios.post(`${API_URL}/base`);

export const updateBaseRequest = async (id, newValues) => 
    await axios.put(`${API_URL}/base/${id}`, newValues);

export const deleteBaseRequest = async (id) => 
    await axios.delete(`${API_URL}/base/${id}`);