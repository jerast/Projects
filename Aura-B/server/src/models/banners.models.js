import { Schema, model } from 'mongoose';

const bannerSquema = Schema({
	text: {
		type: String,
	},
	image: {
		type: String,
	},
	action: {
		type: String,
	},
	state: {
		type: Boolean,
		default: true,
	},
});

bannerSquema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	return { id: _id, ...object };
});

export default model('Banner', bannerSquema);
