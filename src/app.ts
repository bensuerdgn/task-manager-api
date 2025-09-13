import express from 'express';
import { connectDB } from './config/db';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(express.json());

connectDB();

app.use('/api/tasks', taskRoutes);

export default app;
