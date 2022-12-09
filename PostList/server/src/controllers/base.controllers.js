import Base from '../models/base.models.js';

export const getBase = async (request, response) => {
	try {
		const base = await Base.find();
		if (!base) 
			return response.sendStatus(404);
		return response.json(base[0]);
	} catch (error) {
		getError(response, error);
	}
};

export const createBase = async (request, response) => {
	try {
		const newBase = new Base();
		await newBase.save();
		response.json(newBase);
	} catch (error) {
		getError(response, error);
	}
};

export const updateBase = async (request, response) => {
	try {
		const updatedBase = await Base.findByIdAndUpdate(
			request.params.id,
			request.body,
			{ new: true }
		);
		if (!updatedBase) 
			return response.sendStatus(404);
		return response.json(updatedBase);
	} catch (error) {
		getError(response, error);
	}
};

export const deleteBase = async (request, response) => {
	try {
		const deletedBase = await Base.findByIdAndDelete(request.params.id);
		if (!deletedBase) 
			return response.sendStatus(404);
		return response.sendStatus(204);
	} catch (error) {
		getError(response, error);
	}
};

const getError = (response, error) =>
	response.status(500).json({
		info: 'Something goes wrong with controllers',
		message: error.message,
		log: error,
});