import { 
	getLastOrder, 
	getLastShoppingCart, 
	setLastOrder, 
	setLastShoppingCart,
} from '@/helpers';
import { 
	setActiveProduct, 
	onAddProductShoppingCart, 
	onPlusProductShoppingCart, 
	onSetOrder, 
	onMinusProductShoppingCart, 
	onRemoveProductShoppingCart, 
	onSetShoppingCart,
	setActiveOrder,
} from '../slices/app.slice';

export const startLoadingSelectedOrder = ( order_id ) =>
	(dispatch, getState) => {
		const { orders } = getState().session;

		const findOrder = orders.find( order => order.id === order_id );
		if ( !findOrder ) return;

		dispatch( setActiveOrder(findOrder) );

		// try {
		// 	const { data } = await shopApi.get(`/orders/${ order_id }`);
		// } catch (error) {
		// 	console.error( `Something's wrong on Request` );
		// }
	};

export const startLoadingSelectedProduct = ( product_id ) =>
	(dispatch, getState) => {
		const { products } = getState().shop;

		const findProduct = products.find( product => product.id === product_id );
		if ( !findProduct ) return;

		dispatch( setActiveProduct(findProduct) );

		// try {
		// 	const { data } = await shopApi.get(`/orders/${ product_id }`);
		// } catch (error) {
		// 	console.error( `Something's wrong on Request` );
		// }
	};

export const startSettingOrder = ({ action, prices }) => 
	(dispatch, getState) => {
		const { order } = getState().app;

		let total_items, total_order;

		switch ( action ) {
			case 'add':
				total_items = order.total_products + 1;
				total_order = {
					retail: order.total_prices.retail + prices.retail,
					wholesale: order.total_prices.wholesale + prices.wholesale,
				};
				break;

			case 'reduce':
				total_items = order.total_products - 1;
				total_order = {
					retail: order.total_prices.retail - prices.retail,
					wholesale: order.total_prices.wholesale - prices.wholesale,
				};
				break;
		
			default:
				total_items = order.total_products;
				total_order = {
					retail: order.total_prices.retail,
					wholesale: order.total_prices.wholesale,
				};
				break;
		};

		const initOrder = {
			total_products: total_items,
			total_prices: total_order,
		};

		dispatch( onSetOrder( initOrder ));
	};

export const startAddToShoppingCart = ( productToUpdate, count = 1 ) => 
	(dispatch, getState) => {
		const { shoppingCart } = getState().app;
		const productIndex = shoppingCart.findIndex( prod => prod.product === productToUpdate.product );
		
		if ( productIndex === -1 ) {
			return dispatch( onAddProductShoppingCart({ ...productToUpdate, count }) );
		}

		dispatch( onPlusProductShoppingCart({ index: productIndex, count }) );
	};

export const startReduceToShoppingCart = ( productToUpdate, count = 1  ) => 
	(dispatch, getState) => {
		const { shoppingCart } = getState().app;
		const productIndex = shoppingCart.findIndex( prod => prod.product === productToUpdate.product );

		if ( shoppingCart[productIndex].count === 1 ) 
			return dispatch( onRemoveProductShoppingCart( productIndex ));

		dispatch( onMinusProductShoppingCart({ index: productIndex, count }) );
	};

export const startRemoveToShoppingCart = ( id ) => 
	 (dispatch, getState) => {
		const { order, shoppingCart } = getState().app;
		const productIndex = shoppingCart.findIndex( prod => prod.product === id );
		const { prices, count } = shoppingCart[ productIndex ];

		const initOrder = {
			total_products: order.total_products - count,
			total_prices: {
				retail: order.total_prices.retail - (prices.retail * count),
				wholesale: order.total_prices.wholesale - (prices.wholesale * count),
			},
		};

		dispatch( onSetOrder( initOrder ));
		dispatch( onRemoveProductShoppingCart( productIndex ));
	};

export const startSetShoppingCart = () => 
	(dispatch, getState) => {
		const { order, shoppingCart } = getState().app;

		setLastOrder( order );
		setLastShoppingCart( shoppingCart );
	};

export const startGetShoppingCart = () => 
	(dispatch) => {
		(getLastOrder) && dispatch( onSetOrder(getLastOrder));
		(getLastShoppingCart) && dispatch( onSetShoppingCart(getLastShoppingCart));
	};