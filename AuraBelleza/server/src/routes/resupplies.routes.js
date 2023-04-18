import { Router } from 'express';
import {
	createRessuply,
	deleteRessuply,
	getRessuply,
	getResupplies,
	updateRessuply,
	toogleRessuply
} from '../controllers/resupplies.controllers.js';

const router = Router();

router.get('/', getResupplies);
router.get('/:id', getRessuply);
router.post('/', createRessuply);
router.put('/:id', updateRessuply);
router.delete('/:id', toogleRessuply);
router.delete('/delete/:id', deleteRessuply);

export default router;
