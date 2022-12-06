import mongoose from 'mongoose';

const postSquema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	image: {
		url: String,
		public_id: String,
	},
	titleBg: {
		type: Number,
	},
	like: {
		default: false,
		type: Boolean,
	},
	date: {
		default: new Date(),
		type: Date,
	},
});

export default mongoose.model('Post', postSquema);
