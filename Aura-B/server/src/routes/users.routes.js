import { Router } from 'express';
import {
	getUsers,
	loginUser,
	createUser,
	updateUser,
	toogleUser,
	deleteUser,
	revalidateJWT,
} from '../controllers/users.controllers.js';
import { validateJWT } from '../middlewares/validate_jwt.js';

const router = Router();

router.get('/', getUsers);
router.post('/', loginUser);
router.post('/new', createUser);
router.put('/:id', updateUser);
router.delete('/:id', toogleUser);
router.delete('/delete/:id', deleteUser);
router.get('/jwt', validateJWT, revalidateJWT);

export default router;
