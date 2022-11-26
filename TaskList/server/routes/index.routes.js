import { Router } from 'express';
import { pong } from '../controllers/index.controllers.js';

const router = Router();

router.get('/ping', pong);

export default router;
