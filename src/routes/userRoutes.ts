import { Router, Express } from 'express';
import { createUser, singIn, getAllUsers } from '../controllers/userController';

const userRouter = (app: Express): void => {
  const router = Router();

  router.get('/', getAllUsers);
  router.post('/', createUser);
  router.post('/login', singIn);

  app.use('/api/user', router);
};

export default userRouter;
