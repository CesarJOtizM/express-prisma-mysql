import dotenv from 'dotenv';
import app from './app';

dotenv.config();

function Main() {
  app.listen(process.env.PORT);
  console.log(`Listening http://localhost:${process.env.PORT}`);
}

Main();
