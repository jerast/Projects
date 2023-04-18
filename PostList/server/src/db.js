import mongoose from 'mongoose';
import { DB_URI } from './config.js';

export const connectDB = async () => {
	try {
		const database = await mongoose.connect(DB_URI);
		console.log('Connected to', database.connection.name);
	} catch (error) {
		console.error({
			info: `Something's wrong with the database connection`,
			message: error.message,
		});
	}
};
