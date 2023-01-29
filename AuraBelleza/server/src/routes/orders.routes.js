import { Router } from 'express';
import {
	createOrder,
	deleteOrder,
	getOrder,
	getOrders,
	updateOrder,
} from '../controllers/orders.controllers.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
