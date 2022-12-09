import { Router } from 'express';
import {
	getBase,
   createBase,
   updateBase,
   deleteBase
} from '../controllers/base.controllers.js';

const router = Router();

router.get('/base', getBase);
router.post('/base', createBase);
router.put('/base/:id', updateBase);
router.delete('/base/:id', deleteBase);

export default router;