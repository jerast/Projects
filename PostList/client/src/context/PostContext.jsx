import { createContext, useContext, useState, useEffect } from 'react';
import {
	getPostsRequest,
	getPostRequest,
	createPostRequest,
	deletePostRequest,
	updatePostRequest,
} from '../api/posts.api';
import {
	getBaseRequest,
	createBaseRequest,
	updateBaseRequest,
} from '../api/base.api';
import { titleBgData as backgroundsData } from '../api/titleBg.data';

export const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostProvider = ({ children }) => {

	// Post Base State func
	const [base, setBase] = useState([])
	
	// Backgrounds List State
	const [backgrounds] = useState(backgroundsData);

	useEffect(() => {
		getBase();
	}, [])

	const getBase = async () => {
		const { data } = await getBaseRequest();
		setBase( data );
	};

	// const createBase = async () => {
	// 	const { data } = await createBaseRequest();
	// 	return data;
	// };

	const updateBase = async (Base) => {
		await updateBaseRequest(base.Base._id, { Base });
		await getBase();
	}

	const getPost = async (id) => {
		const { data } = await getPostRequest(id);
		return await data;
	};

	const createPost = async (post) => {
		const { data } = await createPostRequest(post);
		await updateBase([...base.Base, data._id]);
	};

	const deletePost = async (id) => {
		await deletePostRequest(id);
		await updateBase([...base.Base].filter(item => item !== id ));
	};

	const updatePost = async (id, post) => {
		await updatePostRequest(id, post);
	};

	const toogleLike = async (post) => {
		await updatePostRequest(post._id, { like: !post.like });
	};

	return (
		<PostsContext.Provider
			value={{
				base,
				setBase,
				getBase,
				getPost,
				createPost,
				deletePost,
				updatePost,
				toogleLike,
				backgrounds,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
};
