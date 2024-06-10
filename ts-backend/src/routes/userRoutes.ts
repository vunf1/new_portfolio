import express from 'express';
import { apiKeyAuth } from '../middleware/auth';

import { info } from '../logger';
import { createUser, getUsers, getUserIdByEmail, getUserById, updateUser, deleteUser } from '../controller/userController';


const router = express.Router();

info("Registering user routes...");
router.post('/register', createUser);
router.post('/getusers', getUsers);
router.get('/email/:email', getUserIdByEmail);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;
