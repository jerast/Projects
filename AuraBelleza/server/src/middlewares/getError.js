export const getError = (response, error) =>
	response.status(500).json({
		info: 'Something goes wrong with controllers',
		message: error.message,
		log: error,
});