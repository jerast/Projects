import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import postsRoutes from './routes/posts.routes.js';

const app = express();

// middlewares
app.use(cors());
// app.use(cors({ origin: 'http://localhost:5173', }));
// app.use(cors({ origin: 'http://192.168.0.252:5173', }));
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}));

// routes
app.use('/api', postsRoutes);

export default app;
