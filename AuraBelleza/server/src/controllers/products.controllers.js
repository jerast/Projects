export const getProducts = (request, response) => {
	return response.json({
		ok: true,
		message: 'getProducts',
	});
};

export const getProduct = (request, response) => {
	return response.json({
		ok: true,
		message: 'getProduct',
	});
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
