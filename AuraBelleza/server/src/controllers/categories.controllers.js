export const getCategories = (request, response) => {
	return response.json({
		ok: true,
		message: 'getCategories',
	});
};

export const getCategory = (request, response) => {
	return response.json({
		ok: true,
		message: 'getCategory',
	});
};

export const createCategory = (request, response) => {
	return response.json({
		ok: true,
		message: 'createCategory',
	});
};

export const updateCategory = (request, response) => {
	return response.json({
		ok: true,
		message: 'updateCategory',
	});
};

export const deleteCategory = (request, response) => {
	return response.json({
		ok: true,
		message: 'deleteCategory',
	});
};
