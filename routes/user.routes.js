import {Router} from 'express';
import userController from '../controllers/user.controller';
import {verifyAuth} from '../middlewares/verifyAuth.middleware';

const userRoutes = Router();

userRoutes.get('/users/:id', verifyAuth, userController.show);
userRoutes.get('/users/logout', userController.logout);

userRoutes.post('/users/signin', userController.login);
userRoutes.post('/users/create', userController.create);

userRoutes.put('/users/:id', verifyAuth, userController.update);
userRoutes.put('/users/imc/:id', verifyAuth, userController.updateImc);

userRoutes.delete('/users/:id', verifyAuth, userController.destroy);

export default userRoutes;