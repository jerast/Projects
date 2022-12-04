import { createContext, useContext, useState, useEffect } from 'react';
import { getPostsRequest, createPostRequest } from '../api/posts.api';

export const PostsContext = createContext();

export const usePostsContext = () => useContext(PostsContext);

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => { getPosts() }, []);

	const getPosts = async () => {
		const { data } = await getPostsRequest();
		setPosts(data);
	};

	const createPost = async (post) => {
		const { data } = await createPostRequest(post);
		setPosts( [...posts, data] );
	};

	return (
		<PostsContext.Provider value={{ posts, getPosts, createPost }}>
			{children}
		</PostsContext.Provider>
	);
};
