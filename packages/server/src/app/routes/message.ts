import { Router } from 'express';
import MessageController from '../controllers/MessageController';

const messageRoutes = Router();

messageRoutes.get('/', MessageController.index);
messageRoutes.post('/', MessageController.store);

export default messageRoutes;
