import { getError } from '../middlewares/getError.js';
import Resupply from '../models/resupplies.models.js';

export const getResupplies = async (request, response) => {
	try {
		const resupplies = await Resupply.find();

		return response.json({
			ok: true,
			resupplies
		});
	} 
	catch (error) {
		getError(response, error);
	}
};

export const getResupply = async (request, response) => {
	try {
		const { id } = request.params;
		
		const [ category ] = await Category.find({ _id: id });

		if ( !category ) {
			return response.status(404).json({
				ok: false,
				message: `Category not found`,
			});
		}

		return response.json({
			ok: true,
			category
		});
	} 
	catch (error) {
		getError(response, error);
	}
};

export const createResupply = async (request, response) => {
	try {
		const category = new Category({ ...request.body });
		await category.save();

		return response.json({
			ok: true,
			category
		});
	}
	catch (error) {
		getError(response, error);
	}
};

export const updateResupply = async (request, response) => {
	try {
		const { id } = request.params;
		const { name, description } = request.body;

		const category = await Category.findById( id );
		
		if ( !category ) {
			return response.status(404).json({
				ok: false,
				message: `Category not found`,
			});
		}

		if ( !name && !description ) {
			return response.status(404).json({
				ok: false,
				message: `Request can't be null`,
			});
		}

		const updatedCategory = await Category.findByIdAndUpdate( id, { ...request.body }, { new: true } );

		return response.json({
			ok: true,
			category: updatedCategory
		});
	}
	catch (error) {
		getError(response, error);
	}
};

export const toogleResupply = async (request, response) => {
	try {
		const { id } = request.params;

		const category = await Category.findById( id );
		
		if ( !category ) {
			return response.status(404).json({
				ok: false,
				message: `Category not found`,
			});
		}

		const toogledCategory = { 
			...category._doc, 
			state: !category._doc.state 
		}

		const updatedCategory = await Category.findByIdAndUpdate( id, toogledCategory, { new: true } );

		return response.json({
			ok: true,
			category: updatedCategory
		});
	}
	catch (error) {
		getError(response, error);
	}
}

export const deleteResupply = async (request, response) => {
	try {
		const { id } = request.params;

		const category = await Category.findById( id );
		
		if ( !category ) {
			return response.status(404).json({
				ok: false,
				message: `Category not found`,
			});
		}

		await Category.findByIdAndDelete( id );

		return response.json({
			ok: true,
			message: 'Category deleted',
		});
	}
	catch (error) {
		getError(response, error);
	}
};
