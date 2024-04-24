import { shopApi } from '@/api';
import { removeLastOrder, removeLastShoppingCart } from '@/helpers';
import { 
	onLoadOrders, 
	onChecking, 
	onLogin, 
	onLogout, 
	onSaveStarts, 
	onSaveEnds, 
	onAddToOrders, 
	clearOrder,
	clearShoppingCart,
	onReduceProductStock,
	startLoadingProducts,
	clearErrorMessage,  
} from '@/store';

export const startVerifyingSession = () =>
	async (dispatch) => {
		dispatch( onChecking() );

      const token = localStorage.getItem('sessionToken');

      if ( !token ) {
         return dispatch( startLogout() );
      }

      try {
         const { data } = await shopApi.get('/users/jwt');
			
         localStorage.setItem( 'sessionToken', data.token );

         dispatch( onLogin( data.user ) );
			dispatch( startLoadingOrders() );
      } 
      catch {
         localStorage.removeItem('token');
         dispatch( startLogout() );
      }
   };

export const startSignin = ({ name, surname, email, password, phone }) => 
	async (dispatch) => {
      try {
         const { data } = await shopApi.post('/users/new', { name, surname, email, password, phone })
         dispatch( startLogin( data.user ) );
			return data.ok;
      }  
      catch ({ response }) {
         dispatch( startLogout(response.data.message) );
			return response.data.ok;
      }
   };

export const startLogin = ({ email, password }) => 
	async (dispatch) => {
		dispatch( onChecking() );

		try {
			const { data } = await shopApi.post('/users/', { email, password })
			localStorage.setItem( 'sessionToken', data.token );
			dispatch( onLogin( data.user ) );
			dispatch( startLoadingOrders() );
			return data.ok;
		} catch ({ response }) {
			dispatch( startLogout(response.data.message) );
			return response.data.ok;
		}
	};

export const startLogout = ( message ) => 
	(dispatch) => {
		localStorage.removeItem('sessionToken');
		dispatch( onLogout(message) );
		// dispatch( clearActiveOrder() );

		if (message) {
			// setTimeout(() => dispatch(clearErrorMessage()), 10)
		}
	};

export const startLoadingOrders = () =>
	async (dispatch, getState) => {
		const { user, status } = getState().session;

		if ( status !== 'auth' ) return;

		try {
			const filter = {
				field: 'user',
				value: user.id,
			};
			const { data } = await shopApi.get('/orders', { headers: filter });
			dispatch( onLoadOrders(data.orders) );

		} catch (error) {
			console.error( 'Something fails at load Orders' );
		}
	};

export const startSavingOrder = () => 
	async (dispatch, getState) => {
		const { user } = getState().session;
		const { products } = getState().shop;
		const { order, shoppingCart } = getState().app;
	
		dispatch( onSaveStarts() );

		await dispatch( startLoadingProducts() );

		const finalOrder = {
			user: user.id,
			total_price: order.total_products >= 6 ? order.total_prices.wholesale : order.total_prices.retail,
			discount: order.total_products >= 6 ? true : false,
			list: shoppingCart,
			date: new Date(),
		}; 

		try {
			const { data } = await shopApi.post(`/orders`, finalOrder);

			if ( data.message ) 
				throw new Error( data.message );

			data.order.list.forEach( element => {
				const productIndex = products.findIndex( item => item.id === element.product );
				
				dispatch( onReduceProductStock({ index: productIndex, count: element.count }) );
			});

			dispatch( onAddToOrders( data.order ) );
			dispatch( clearOrder() );
			dispatch( clearShoppingCart() );

			removeLastOrder();
			removeLastShoppingCart();
			
		} catch (error) {
			console.error('Something fails at Saving Order');
		}

		dispatch( onSaveEnds() );
	};