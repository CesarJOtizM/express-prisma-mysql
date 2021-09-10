import { Router, Express } from 'express';
import {
  create,
  findAll,
  findOne,
  edit,
  deleteOne,
} from '../controllers/processorController';

const processorRouter = (app: Express): void => {
  const router = Router();

  router.post('/', create);
  router.get('/', findAll);
  router.get('/:id', findOne);
  router.put('/:id', edit);
  router.delete('/:id', deleteOne);

  app.use('/api/processor', router);
};

export default processorRouter;
