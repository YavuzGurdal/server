import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { deleteUser, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/find/:id', verifyToken, getUser)
router.put('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)

export default router; 