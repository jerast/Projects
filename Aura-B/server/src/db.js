import mongoose from 'mongoose';
import { DB_CNN, DB_OFF } from './config.js';

export const connectDB = async () => {
	try {
		await mongoose.set('strictQuery', false);
		await mongoose.connect(DB_CNN);
		
		console.log('DB Connected!');
	} catch (error) {
		console.log({
			info: `Something's wrong with the database connection`,
			message: error.message,
		});
	}
};
