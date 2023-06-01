import { Order } from '../models/orders.models.js';
import { responseError } from '../middlewares/responseError.js';
import mongoose from 'mongoose';

const data = {
	user: "646ac40729963803f31083b6",
	total_price: 30000,
	discount: false,
	list: [
		{	
			prices: {
			retail: 30000,
			wholesale: 27000
			},
			product: "643f115667f127ee7bad1fd9",
			count: 1
		},
		{	
			prices: {
			retail: 2500,
			wholesale: 2000
			},
			product: "643f119a67f127ee7bad1feb",
			count: 2
		},
		{	
			prices: {
			retail: 2500,
			wholesale: 2000
			},
			product: "643f114867f127ee7bad1fd7",
			count: 2
		}
	],
};

export const getOrders = async (request, response) => {
	try {
		const { field, value } = request.headers;

		let orders = (field && value) 
			? await Order.find({ [field]: value })
			: await Order.find();

		return response.json({
			ok: true,
			orders,
		});
	} catch (error) {
		responseError(response, error);
	}
};

export const createOrder = async (request, response) => {	
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		await Order.insertMany([ data, data, data, data ], { session });

		await session.abortTransaction();
		// await session.commitTransaction();

	} catch ( error ) {
		await session.abortTransaction();
   	
		console.log( error );
	}

	await session.endSession();

	return response.json({
		ok: true,
		// order: order,
	});
	
};