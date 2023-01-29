export const getOrders = (request, response) => {
	return response.json({
		ok: true,
		message: 'getOrders',
	});
};

export const getOrder = (request, response) => {
	return response.json({
		ok: true,
		message: 'getOrder',
	});
};

export const createOrder = (request, response) => {
	return response.json({
		ok: true,
		message: 'createOrder',
	});
};

export const updateOrder = (request, response) => {
	return response.json({
		ok: true,
		message: 'updateOrder',
	});
};

export const deleteOrder = (request, response) => {
	return response.json({
		ok: true,
		message: 'deleteOrder',
	});
};
