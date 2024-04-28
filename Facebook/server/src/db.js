import mongoose from 'mongoose';
import { DB_CNN } from './config.js';

export const connectDB = async () => {
	try {
		await mongoose.set('strictQuery', false);
		const database = await mongoose.connect(DB_CNN);
		console.log('Connected to', database.connection.name);
	} catch (error) {
		console.error({
			info: `Something's wrong with the database connection`,
			message: error.message,
		});
	}
};
