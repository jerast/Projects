import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orders.controllers.js';
import { validateJWT } from '../middlewares/validate_jwt.js';

const router = Router();

router.use(validateJWT);

router.get('/', getOrders);
router.post('/', createOrder);

export default router;
