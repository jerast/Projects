import { Schema, model } from 'mongoose';

const userSquema = Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		unique: true,
	},
	role: {
		type: String,
		required: true,
		default: 'customer',
	},
	state: {
		type: Boolean,
		required: true,
		default: true,
	},
	
});

userSquema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	return { id: _id, ...object };
});

export default model('User', userSquema);
