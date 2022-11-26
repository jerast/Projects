import { Router } from 'express';
import {
	getTasks,
	getTask,
	createTask,
	updateTasks,
	deleteTasks,
} from '../controllers/tasks.controllers.js';

const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTasks);
router.delete('/tasks/:id', deleteTasks);

export default router;
