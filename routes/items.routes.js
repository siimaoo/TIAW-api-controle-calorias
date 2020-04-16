import { Router } from 'express';
import itemsController from '../controllers/items.controller';

const itemsRoutes = Router();

itemsRoutes.get('/items/:name', itemsController.search);

export default itemsRoutes;