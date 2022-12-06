import { createContext, useContext, useState, useEffect } from 'react';
import {
	getPostsRequest,
	getPostRequest,
	createPostRequest,
	deletePostRequest,
	updatePostRequest,
} from '../api/posts.api';
import { titleBgData as backgroundsData } from '../api/titleBg.data';

export const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	const getPosts = async () => {
		const { data } = await getPostsRequest();
		setPosts(data);
	};

	const getPost = async (id) => {
		const { data } = await getPostRequest(id);
		return data;
	};

	const createPost = async (post) => {
		const { data } = await createPostRequest(post);
		// setPosts([...posts, data]);
	};

	const deletePost = async (id) => {
		await deletePostRequest(id);
		setPosts([...posts.filter((post) => post._id !== id)]);
	};

	const updatePost = async (id, post) => {
		await updatePostRequest(id, post);
		// getPosts();
	};

	const toogleLike = async (post) => {
		await updatePostRequest(post._id, { like: !post.like });

		posts.map((item) => (item._id === post._id ? (item.like = !item.like) : item.like));
		setPosts([...posts]);
	};

	const [backgrounds] = useState(backgroundsData);

	return (
		<PostsContext.Provider
			value={{
				posts,
				backgrounds,
				getPosts,
				getPost,
				createPost,
				deletePost,
				updatePost,
				toogleLike,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
};
