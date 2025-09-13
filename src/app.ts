import express from 'express';
import { connectDB } from './config/db';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());

connectDB();

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

export default app;
