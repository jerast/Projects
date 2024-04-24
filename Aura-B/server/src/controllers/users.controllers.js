import { responseError } from '../middlewares/responseError.js';
import { generateJWT } from '../jwt/jwt.js';
import User from '../models/users.models.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (request, response) => {
	try {
		const { field, value } = request.headers;

		let users = (field && value) 
			? await User.find({ [field]: value })
			: await User.find();

		return response.json({
			ok: true,
			users,
		});
	} catch (error) { responseError(response, error) }
};

export const createUser = async (request, response) => {
	const { email, password } = request.body;

	try {
		const validUser = await User.findOne({ email });
		if ( validUser ) return response.status(400).json({
			ok: false,
			message: 'This email is already used.',
		});

		const cryptedPassword = bcrypt.hashSync( password, bcrypt.genSaltSync() );

		const user = new User({ ...request.body, password: cryptedPassword });
		await user.save();

		return response.status(201).json({
			ok: true,
			user: {
				email,
				password,
			},
		});
	} catch (error) { responseError(response, error) }
};

export const loginUser = async (request, response) => {

	const { email, password } = request.body;

	try {
		const user = await User.findOne({ email });
		if ( !user ) return response.status(400).json({
			ok: false,
			message: 'User / Password are not correct.',
		});

		const validPassword = bcrypt.compareSync( password, user.password );
		if ( !validPassword ) return response.status(400).json({
			ok: false,
			message: 'User / Password are not correct.',
		});

		const token = await generateJWT( user.id, user.name, user.surname, user.email, user.phone, user.role );

		return response.json({
			ok: true,
			user: {
				id: user.id,
				name: user.name,
				surname: user.surname,
				email: user.email,
				phone: user.phone,
				role: user.role,
			},
			token,
		});

	} catch (error) { responseError(response, error) }
};

export const updateUser = async (request, response) => {
	try {
		const { id } = request.params;

		const user = await User.findById(id);

		if (!user) {
			return response.status(404).json({
				ok: false,
				message: `User not found`,
			});
		}

		const updatedUser = await User.findByIdAndUpdate(id, { ...request.body }, { new: true });

		return response.json({
			ok: true,
			user: updatedUser,
		});
	} catch (error) { responseError(response, error) }
};

export const toogleUser = async (request, response) => {
	try {
		const { id } = request.params;

		const user = await User.findById(id);

		if (!user) {
			return response.status(404).json({
				ok: false,
				message: `User not found`,
			});
		}

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ state: !user._doc.state },
			{ new: true }
		);

		return response.json({
			ok: true,
			user: updatedUser,
		});
	} catch (error) { responseError(response, error) }
};

export const deleteUser = async (request, response) => {
	try {
		const { id } = request.params;

		const user = await User.findById(id);

		if (!user) {
			return response.status(404).json({
				ok: false,
				message: `User not found`,
			});
		}

		await User.findByIdAndDelete(id);

		return response.json({
			ok: true,
			message: 'User deleted',
		});
	} catch (error) { responseError(response, error) }
};

export const revalidateJWT = async (request, response) => {
	try {
		const { id, name, surname, email, phone, role } = request.session;

		const token = await generateJWT( id, name, surname, email, phone, role );

		return response.json({
			ok: true,
			user: {
				id,
				name,
				surname,
				email,
				phone,
				role,
			},
			token,
		});
	} catch (error) {
		responseError(response, error);
	}
};

