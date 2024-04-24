import { Schema, model } from 'mongoose';

const resupplyProductSquema = Schema({
	resupply_id: {
		type: Schema.Types.ObjectId,
		ref: 'Resupply',
		required: true,
	},
	product_id: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	unit_price: {
		type: Number,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
});

resupplyProductSquema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	return { id: _id, ...object };
});

export default model('ResupplyProduct', resupplyProductSquema);
