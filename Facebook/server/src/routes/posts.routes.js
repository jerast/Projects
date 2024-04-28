import { Router } from 'express';
import {
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
} from '../controllers/posts.controllers.js';

const router = Router();

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;
