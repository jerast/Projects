import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
	name: 'shop',
	initialState: {
      categories: [],
      products: [],
	},
	reducers: {
		onLoadCategories: (state, { payload = [] }) => {
			state.categories = payload;
		},
		onLoadProducts: (state, { payload = [] }) => {
			state.products = payload;
		},
		onReduceProductStock: (state, { payload }) => {
			state.products[ payload.index ].stock -= payload.count;
		},
	},
});

export const { 
	onLoadCategories,
	onLoadProducts,
	onReduceProductStock,
} = shopSlice.actions;
