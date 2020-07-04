import { Router } from 'express';
import recipeController from '../controllers/recipe.controller';
import { verifyAuthAdmin } from '../middlewares/verifyAuth.middleware';

const recipeRoutes = Router();

recipeRoutes.get('/recipe', recipeController.show);
recipeRoutes.post('/recipe', verifyAuthAdmin ,recipeController.store);

export default recipeRoutes;