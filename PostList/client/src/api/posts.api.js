import axios from 'axios'

const API_URL = 'http://localhost:4000/api';

export const getPostsRequest = async () =>
    await axios.get(`${API_URL}/posts`);

export const getPostRequest = async (id) => 
    await axios.get(`${API_URL}/posts/${id}`);

export const createPostRequest = async (post) => 
    await axios.post(`${API_URL}/posts`, post);

export const deletePostRequest = async (id) => 
    await axios.delete(`${API_URL}/posts/${id}`);

export const updatePostRequest = async (id, newValues) => 
    await axios.put(`${API_URL}/posts/${id}`, newValues);

// export const updatePostRequest = async (id, newValues) => 
//     await axios.put(`${API_URL}/posts/${id}`, {...newValues});

// export const toogleLikeRequest = async (id, {title}) => 
//     await axios.put(`${API_URL}/posts/${id}`, {title});