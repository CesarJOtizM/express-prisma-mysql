import { Router, Express } from 'express';
import {
  create,
  findAll,
  findOne,
  edit,
  deleteOne,
} from '../controllers/requestController';

const requestRouter = (app: Express): void => {
  const router = Router();

  router.post('/', create);
  router.get('/', findAll);
  router.get('/:id', findOne);
  router.put('/:id', edit);
  router.delete('/:id', deleteOne);

  app.use('/api/request', router);
};

export default requestRouter;
