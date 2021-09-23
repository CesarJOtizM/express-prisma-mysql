import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/userRoutes';
import estateRouter from './routes/estateRouter';
import ownerRouter from './routes/ownerRoutes';
import roleRouter from './routes/roleRoutes';
import processorRouter from './routes/processorRoutes';

const app = express();

//middleware's
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
userRouter(app);
estateRouter(app);
ownerRouter(app);
roleRouter(app);
processorRouter(app);

export default app;
