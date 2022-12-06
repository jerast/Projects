import Post from '../models/posts.models.js';
import { uploadImage, deleteImage } from '../libraries/cloudinary.js';
import fs from 'fs-extra';

const getError = (response, error) =>
	response.status(500).json({
		info: 'Something goes wrong with controllers',
		message: error.message,
	});

export const getPosts = async (request, response) => {
	try {
		const posts = await Post.find();
		response.send(posts);
	} catch (error) {
		getError(response, error);
	}
};

export const getPost = async (request, response) => {
	try {
		const post = await Post.findById(request.params.id);

		if (!post) return response.sendStatus(404);

		return response.json(post);
	} catch (error) {
		getError(response, error);
	}
};

export const createPost = async (request, response) => {
	try {
		const { title, titleBg } = request.body;
		let image;

		if (request.files?.image) {
			const { public_id, secure_url } = await uploadImage(request.files.image.tempFilePath);

			await fs.remove(request.files.image.tempFilePath);

			image = {
				url: secure_url,
				public_id,
			};
		}

		const newPost = new Post({ title, image, titleBg });
		await newPost.save();

		response.json(newPost);
	} catch (error) {
		console.log(error);
		getError(response, error);
	}
};

export const updatePost = async (request, response) => {
	try {
		let { title, titleBg, like } = request.body;

		if (like === undefined) titleBg = titleBg || 0;

		const updatedPost = await Post.findByIdAndUpdate(
			request.params.id,
			{ title, titleBg, like },
			{ new: true }
		);

		if (!updatedPost) return response.sendStatus(404);

		return response.json(updatedPost);
	} catch (error) {
		getError(response, error);
	}
};

export const deletePost = async (request, response) => {
	try {
		const deletedPost = await Post.findByIdAndDelete(request.params.id);

		if (!deletedPost) return response.sendStatus(404);

		if (deletedPost.image?.public_id) await deleteImage(deletedPost.image.public_id);

		return response.sendStatus(204);
	} catch (error) {
		getError(response, error);
	}
};
