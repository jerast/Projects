import mongoose from 'mongoose';

const postSquema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	image: {
		url: {
			type: String,
		},
		public_id: {
			type: String,
		},
	},
	titleBg: {
		type: Number,
		default: 0,
	},
	like: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model('Post', postSquema);
