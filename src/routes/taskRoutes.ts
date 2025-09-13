import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, createTask);
router.get('/', authenticateJWT, getTasks);
router.get('/:id', authenticateJWT, getTaskById);
router.put('/:id', authenticateJWT, updateTask);
router.delete('/:id', authenticateJWT, deleteTask);

export default router;
