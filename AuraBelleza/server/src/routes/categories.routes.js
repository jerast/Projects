import { Router } from 'express';
import {
	createCategory,
	deleteCategory,
	getCategory,
	getCategories,
	updateCategory,
	toogleCategory
} from '../controllers/categories.controllers.js';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', toogleCategory);
router.delete('/delete/:id', deleteCategory);

export default router;
