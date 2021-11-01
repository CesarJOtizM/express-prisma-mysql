import { Router, Express } from 'express';
import {
  create,
  findAll,
  findOneByID,
  findOneByCodCas,
  edit,
  deleteOne,
} from '../controllers/estateController';

const estateRouter = (app: Express): void => {
  const router = Router();

  router.post('/', create);
  router.get('/', findAll);
  router.get('/:id', findOneByID);
  router.get('/codCatastral/:codigoCatastral', findOneByCodCas);

  router.put('/:id', edit);
  router.delete('/:id', deleteOne);

  app.use('/api/estate', router);
};

export default estateRouter;
