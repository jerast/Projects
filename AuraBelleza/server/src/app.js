import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import productsRoutes from './routes/products.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import ordersRoutes from './routes/orders.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/orders', ordersRoutes);

app.use((request, response, next) => {
	response.status(404).json({
		message: 'endpoing not fount',
	});
});

export default app;
