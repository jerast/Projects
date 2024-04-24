import { Order } from '../models/orders.models.js';
import { responseError } from '../middlewares/responseError.js';
import Product from '../models/products.models.js';

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
	try {
		const order = request.body;
		// const { list } = request.body; 

		// let verifyStock = false; 
		// for ( let i = 0; i < list.length; i++ ) {
		// 	const item = list[i];
		// 	const product = await Product.findById( item.product );
			
		// 	if ( item.count > product.stock ) {
		// 		verifyStock = true;
		// 		break;
		// 	};
		// };		

		const finalOrder = new Order({ ...order, state: /* verifyStock ? */ 'Pending'/*  : 'Active'  */});
		await finalOrder.save( async function ( error, result ) {
			result.list.forEach( async item => {
				if (error) return responseError( response, error );
			
				const { stock } = await Product.findById( item.product );
				await Product.findByIdAndUpdate( item.product, { stock: stock - item.count });
			});
		});

		return response.json({
			ok: true,
			order: finalOrder,
		});
	} catch (error) {
		responseError(response, error);
	}
};