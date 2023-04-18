import express from 'express';
import cors from 'cors';
import categoriesRoutes from './routes/categories.routes.js';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
// import resuppliesRoutes from './routes/resupplies.routes.js';
import usersRoutes from './routes/users.routes.js';

const app = express();

// Middlewares
app.use( cors() );
app.use( express.json() );

// Routes
app.use( '/api/categories', categoriesRoutes );
app.use( '/api/products', productsRoutes );
app.use( '/api/orders', ordersRoutes );
app.use( '/api/users', usersRoutes );

// 404
app.use((request, response, next) => {
	response.status(404).json({
		message: 'endpoing not fount',
	});
});

export default app;
