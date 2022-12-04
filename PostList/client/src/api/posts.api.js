import axios from 'axios';

export const getPostsRequest = async () =>
    await axios.get(`api/posts`);

// export const getPostRequest = async (id) => 
//     await axios.get(`/posts/${id}`);

export const createPostRequest = async (post) => 
    await axios.post(`api/posts`, post);

// export const deletePostRequest = async (id) => 
//     await axios.delete(`/posts/${id}`,);

// export const updatePostRequest = async (id, newValues) => 
//     await axios.put(`/posts/${id}`, newValues);