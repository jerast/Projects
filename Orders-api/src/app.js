import express from 'express';
import cors from 'cors';
import ordersRoutes from './routes/orders.routes.js';

const app = express();

// Middlewares
app.use( cors() );
app.use( express.json() );

// Routes
app.use( '/api/orders', ordersRoutes );

// 404
app.use((request, response, next) => {
	response.status(404).json({
		message: 'endpoing not fount',
	});
});

export default app;
