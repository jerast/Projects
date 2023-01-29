import { Router } from 'express';
import {
	createUser,
	deleteUSer,
	getUser,
	getUsers,
	updateUser,
} from '../controllers/users.controllers.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUSer);

export default router;
