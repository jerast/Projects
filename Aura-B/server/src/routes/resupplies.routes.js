import { Router } from 'express';
import {
	getResupplies,
	createResupply,
	getResupplyProducts,
	createResupplyProduct,
} from '../controllers/resupplies.controllers.js';

const router = Router();

router.get('/', getResupplies);
router.post('/', createResupply);

router.get('/:id', getResupplyProducts);
router.post('/:id', createResupplyProduct);

export default router;
