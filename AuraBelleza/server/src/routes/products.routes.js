import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from '../controllers/products.controllers.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
