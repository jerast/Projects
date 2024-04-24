import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
	name: 'session',
	initialState: {
		isChecking: false,
		status: 'checking', // 'auth', 'not-auth'
		user: {},
		orders: [],
		errorMessage: undefined,
	},
	reducers: {
		onChecking: (state) => {
			state.status = 'checking';
			state.isChecking = true;
		},
		onLogin: (state, { payload }) => {
			state.isChecking = false;
			state.status = 'auth';
			state.user = payload;
			state.errorMessage = undefined;
		},
		onLogout: (state, { payload }) => {
			state.isChecking = false;
			state.status = 'not-auth';
			state.user = {};
			state.orders = [];
			state.errorMessage = payload;
		},
		onAddToOrders: (state, { payload }) => {
			state.orders.push( payload );
		},
		onLoadOrders: (state, { payload = [] }) => {
			state.orders = payload;
		},
		setErrorMessage: (state, { payload }) => {
			state.errorMessage = payload;
		},
		clearErrorMessage: (state) => {
			state.errorMessage = undefined;
		},
		
	},
});

export const { 
   onChecking, 
   onLogin, 
   onLogout, 
	onLoadOrders, 
   setErrorMessage, 
   clearErrorMessage, 
	onAddToOrders,
} = sessionSlice.actions;
