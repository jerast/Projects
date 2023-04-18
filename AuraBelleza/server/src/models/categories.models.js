import { Schema, model } from 'mongoose';

const categorySquema = Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	state: {
		type: Boolean,
		default: true,
	}
});

categorySquema.method('toJSON', function() {
	const { __v, _id, ...object } = this.toObject();
	return { id: _id, ...object };
});

export default model('Category', categorySquema);