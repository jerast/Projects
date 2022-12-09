import mongoose from 'mongoose';

const postSquema = new mongoose.Schema({
	Base: {
		type: Object,
      default: [],
	}
});

export default mongoose.model('Base', postSquema);
