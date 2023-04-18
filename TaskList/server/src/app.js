import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(cors());
// app.use(cors({ origin: 'http://localhost:5173', }));
// app.use(cors({ origin: 'http://192.168.0.252:5173', }));
app.use(express.json());

app.use('/api', indexRoutes);
app.use('/api', tasksRoutes);

export default app;
