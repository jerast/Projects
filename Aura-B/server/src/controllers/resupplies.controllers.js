import { responseError } from '../middlewares/responseError.js';
import Resupply from '../models/resupplies.models.js';
import ResupplyProduct from '../models/resupplyProducts.models.js';
import Product from '../models/products.models.js';

export const getResupplies = async (request, response) => {
	try {
		const { field, value } = request.headers;

		let ressuplies;

		if (!field || !value) {
			ressuplies = await Resupply.find();
		}

		if (field && value) {
			ressuplies = await Resupply.find({ [field]: value });
		}

		return response.json({
			ok: true,
			ressuplies,
		});
	} catch (error) {
		responseError(response, error);
	}
};

export const createResupply = async (request, response) => {
	try {
		const resupply = new Resupply({ ...request.body });
		await resupply.save();

		return response.json({
			ok: true,
			resupply,
		});
	} catch (error) {
		responseError(response, error);
	}
};

export const getResupplyProducts = async (request, response) => {
	try {
		const { id } = request.params;

		const resupply = await Resupply.findById(id, { _id: 0, __v: 0 });

		if (!resupply) {
			return response.status(404).json({
				ok: false,
				message: `Resupply not found`,
			});
		}

		const details = await ResupplyProduct.find({ resupply_id: id }, { _id: 0, resupply_id: 0 });

		return response.json({
			ok: true,
			resupply: {
				...resupply._doc,
				details,
			},
		});
	} catch (error) {
		responseError(response, error);
	}
};

export const createResupplyProduct = async (request, response) => {
	try {
		const { id } = request.params;
		const { product_id, count } = request.body;

		const resupply = await Resupply.findById(id);
		if (!resupply) {
			return response.status(404).json({
				ok: false,
				message: `Resupply not found`,
			});
		}

		const product = await Product.findById(product_id);
		await Product.findByIdAndUpdate(product_id, { stock: product.stock + count });

		const resupplyProduct = new ResupplyProduct({ resupply_id: id, ...request.body });
		await resupplyProduct.save();

		return response.json({
			ok: true,
			resupplyProduct,
		});
	} catch (error) {
		responseError(response, error);
	}
};
