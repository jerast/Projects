import { Schema, model } from 'mongoose';

const orderListSquema = Schema({
		order: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
		prices: {
			retail: {
				type: Number,
			},
			wholesale: {
				type: Number,
			},
		},
		count: {
			type: Number,
		},
});

orderSquema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	return { id: _id, ...object };
});

export const Order = model('OrderList', orderListSquema); 
