import axios from 'axios';

const API = 'http://192.168.0.252:4000/api';

export const getTasksRequest = async () =>
    await axios.get(`${API}/tasks`);

export const getTaskRequest = async (id) => 
    await axios.get(`${API}/tasks/${id}`);

export const createTaskRequest = async (task) => 
    await axios.post(`${API}/tasks`, task);

export const deleteTaskRequest = async (id) => 
    await axios.delete(`${API}/tasks/${id}`,);

export const updateTaskRequest = async (id, newValues) => 
    await axios.put(`${API}/tasks/${id}`, newValues);

export const toogleTaskDoneRequest = async (id, {done}) => 
    await axios.put(`${API}/tasks/${id}`, {done});