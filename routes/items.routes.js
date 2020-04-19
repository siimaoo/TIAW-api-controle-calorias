import { Router } from 'express';
import itemsController from '../controllers/items.controller';
import {verifyAuth} from '../middlewares/verifyAuth.middleware';

const itemsRoutes = Router();

itemsRoutes.get('/items/:name', itemsController.search);

itemsRoutes.put('/items/add/:id', verifyAuth, itemsController.add);

itemsRoutes.put('/items/delete/:id', verifyAuth, itemsController.delete);

export default itemsRoutes;