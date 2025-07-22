import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './routes/users';
import { withTransaction } from './middleware/transaction';

const app = express();
const PORT = 3000;

app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log('📦 DB Connected');

  app.use('/users', withTransaction, userRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error during Data Source initialization:', err);
});
