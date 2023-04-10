import { pool } from '../db.js';

const getError = (response, error) =>
	response.status(500).json({
		info: 'Something goes wrong with controllers',
		message: error.message,
		log: error,
});

export const getProducts = async (request, response) => {
	try {
		const [ rows ] = await pool.query(
			`CALL get_products( NULL )`
		);
		const products = rows[0];
		
		response.json({
			ok: true,
			products
		});
	} 
	catch (error) {
		getError(response, error);
	}
};

export const getProduct = async (request, response) => {
	const { id } = request.params;
	try {
		const [ rows ] = await pool.query(
			`CALL get_products( ${ id } )`
		);
		const product = rows[0][0];
		
		response.json({
			ok: true,
			product
		});
	} 
	catch (error) {
		getError(response, error);
	}
};

export const createProduct = (request, response) => {
	return response.json({
		ok: true,
		message: 'createProduct',
	});
};

export const updateProduct = (request, response) => {
	return response.json({
		ok: true,
		message: 'updateProduct',
	});
};

export const deleteProduct = (request, response) => {
	return response.json({
		ok: true,
		message: 'deleteProduct',
	});
};
