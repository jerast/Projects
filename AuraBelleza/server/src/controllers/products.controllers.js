import { getError } from '../middlewares/getError.js';
import Product from '../models/products.models.js';

export const getProducts = async (request, response) => {
	try {
		const products = await Product.find();

		return response.json({
			ok: true,
			products
		});
	} 
	catch (error) {
		getError(response, error);
	}
};

export const getProduct = async (request, response) => {
	try {
		const { id } = request.params;
		
		const product = await Product.findById( id );

		if ( !product ) {
			return response.status(404).json({
				ok: false,
				message: `Product not found`,
			});
		}

		return response.json({
			ok: true,
			product
		});
	} 
	catch (error) {
		getError(response, error);
	}
};

export const createProduct = async (request, response) => {
	try {
		const product = new Product({ ...request.body });
		await product.save();

		return response.json({
			ok: true,
			product
		});
	}
	catch (error) {
		getError(response, error);
	}
};

export const updateProduct = async (request, response) => {
	try {
		const { id } = request.params;

		const product = await Product.findById( id );

		if ( !product ) {
			return response.status(404).json({
				ok: false,
				message: `Product not found`,
			});
		}

		const updatedProduct = await Product.findByIdAndUpdate( id, { ...request.body }, { new: true } );

		return response.json({
			ok: true,
			product: updatedProduct,
		});
	}
	catch (error) {
		getError(response, error);
	}
};

export const toogleProduct = async (request, response) => {
	try {
		const { id } = request.params;

		const product = await Product.findById( id );
		
		if ( !product ) {
			return response.status(404).json({
				ok: false,
				message: `Product not found`,
			});
		}

		const toogledProduct = { 
			...product._doc, 
			state: !product._doc.state 
		}

		const updatedProduct = await Product.findByIdAndUpdate( id, toogledProduct, { new: true } );

		return response.json({
			ok: true,
			product: updatedProduct
		});
	}
	catch (error) {
		getError(response, error);
	}
};

export const deleteProduct = async (request, response) => {
	try {
		const { id } = request.params;

		const product = await Product.findById( id );
		
		if ( !product ) {
			return response.status(404).json({
				ok: false,
				message: `Product not found`,
			});
		}

		await Product.findByIdAndDelete( id );

		return response.json({
			ok: true,
			message: 'Product deleted',
		});
	}
	catch (error) {
		getError(response, error);
	}
};
