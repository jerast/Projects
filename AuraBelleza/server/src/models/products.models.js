import { Schema, model } from 'mongoose';

const productSquema = Schema({
	name: {
		type: String,
		required: true,
		trim: false,
	},
	reference: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
   prices: {
      buy: {
         type: Number,
         required: true,
      },
      retail: {
         type: Number,
         required: true,
      },
      wholesale: {
         type: Number,
         required: true,
      }
   },
   image: {
      type: String,
   },
   state: {
      type: Boolean,
      default: true,
   }
});

productSquema.method('toJSON', function() {
	const {__v, _id, ...object} = this.toObject();
	return { id: _id, ...object };
});

export default model('Product', productSquema);