import { Router, Express } from 'express';
import { invoice, informeRadicado } from '../controllers/templateControllers';

const templateRouter = (app: Express): void => {
  const router = Router();

  router.get('/invoice', invoice);
  router.get('/radicado', informeRadicado);

  app.use('/api/templates', router);
};

export default templateRouter;
