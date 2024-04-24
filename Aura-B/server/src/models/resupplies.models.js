import { Schema, model } from 'mongoose';

const resupplySquema = Schema({
	reference: {
		type: String,
		required: true,
		unique: true,
	},
   date: {
      type: Date,
		default: new Date(),
   },
   total_price: {
      type: Number,
      required: true,
   },
});

resupplySquema.method('toJSON', function() {
	const { __v, _id, ...object } = this.toObject();
	return { id: _id, ...object };
});

export default model('Resupply', resupplySquema);