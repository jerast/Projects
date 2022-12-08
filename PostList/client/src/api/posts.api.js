import axios from 'axios'

const API_URL = 'http://192.168.0.252:4000/api';

export const getPostsRequest = async () =>
    await axios.get(`${API_URL}/posts`);

export const getPostRequest = async (id) => 
    await axios.get(`${API_URL}/posts/${id}`);

export const createPostRequest = async (post) => {
    const form = new FormData();
    for (let key in post ) 
        form.append(key, post[key]);
    return await axios.post(`${API_URL}/posts`, form, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export const updatePostRequest = async (id, newValues) => {
    const form = new FormData();
    for (let key in newValues ) 
        form.append(key, newValues[key]);
    return await axios.put(`${API_URL}/posts/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}
    
export const deletePostRequest = async (id) => 
    await axios.delete(`${API_URL}/posts/${id}`);