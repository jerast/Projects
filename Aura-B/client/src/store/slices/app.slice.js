import { createSlice } from '@reduxjs/toolkit';

const initialShoppingCart = [];
const initialOrder = {
	total_products: 0,
	total_prices: {
		retail: 0,
		wholesale: 0,
	},
};

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		isLoading: true,
		isSaving: false,
		order: initialOrder,
		shoppingCart: initialShoppingCart,
		activeOrder: undefined,
		activeProduct: undefined,
		sidebarIsOpen: false,
      shoppingCartIsOpen: false,
		errorMessage: undefined,
	},
	reducers: {

		// Sidebar & ShoppingCart Modal States
		onToogleSidebar: (state) => {
			state.sidebarIsOpen = !state.sidebarIsOpen;
		},
		onToogleShoppingCart: (state) => {
			state.shoppingCartIsOpen = !state.shoppingCartIsOpen;
		},

		// ActiveOrder & ActiveProduct States
		setActiveOrder: (state, { payload }) => {
			state.activeOrder = payload;
		},
		clearActiveOrder: (state) => {
			state.activeOrder = undefined;
		},
		setActiveProduct: (state, { payload }) => {
			state.activeProduct = payload;
		},
		clearActiveProduct: (state) => {
			state.activeProduct = undefined;
		},

		// Order & ShoppingCart States
		onSetOrder: (state, { payload }) => {
			state.order = payload;
		},
		onSetShoppingCart: (state, { payload }) => {
			state.shoppingCart = payload;
		},
		clearOrder: (state) => {
			state.order = initialOrder;
		},
		clearShoppingCart: (state) => {
			state.shoppingCart = initialShoppingCart;
		},

		// ShoppingCart Modifiers
		onAddProductShoppingCart: (state, { payload }) => {
			state.shoppingCart.push( payload );
		},
		onRemoveProductShoppingCart: (state, { payload }) => {
			state.shoppingCart = state.shoppingCart.filter( (item, index) => index !== payload );
		},
		onPlusProductShoppingCart: (state, { payload }) => {
			state.shoppingCart[ payload.index ].count += payload.count;
		},
		onMinusProductShoppingCart: (state, { payload }) => {
			state.shoppingCart[ payload.index ].count -= payload.count;
		},

		// Saving & Loading States
		onSaveStarts: (state) => {
			state.isSaving = true;
		},
		onSaveEnds: (state) => {
			state.isSaving = false;
		},
		onLoadStarts: (state) => {
			state.isLoading = true;
		},
		onLoadEnds: (state) => {
			state.isLoading = false;
		},
	},
});

export const {
	onToogleSidebar,
	onToogleShoppingCart,
	setActiveOrder, 
	setActiveProduct, 
	clearActiveOrder, 
	clearActiveProduct, 
	onSetOrder,
	onSetShoppingCart,
	clearOrder,
	clearShoppingCart,
	onAddProductShoppingCart, 
	onRemoveProductShoppingCart, 
	onPlusProductShoppingCart, 
	onMinusProductShoppingCart,
	onSaveStarts,
	onSaveEnds,
	onLoadStarts,
	onLoadEnds,
} = appSlice.actions;
