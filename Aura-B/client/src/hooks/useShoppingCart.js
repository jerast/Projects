import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
	startAddToShoppingCart, 
	startReduceToShoppingCart, 
	startRemoveToShoppingCart, 
	startSetShoppingCart, 
	startSettingOrder 
} from '@/store';

export const useShoppingCart = ( id ) => {
	const { shoppingCart } = useSelector( state => state.app );
	const { products } = useSelector( state => state.shop );
	const [ productCounter, setProductCounter ] = useState(0);
	const dispatch = useDispatch();

	const product = products.find( product => product.id === id );
   const productSC = shoppingCart.find( item => item.product === id );

	useEffect(() => {
      setProductCounter( productSC?.count || 0 );
   }, [productSC]);

	const onSettingOrder = ( action ) => { 
		dispatch( startSettingOrder({
			action,
			prices: product.prices,
		}) );
	};

	const onAddToShoppingCart = () => {
		onSettingOrder( 'add' );
		dispatch( startAddToShoppingCart({
			product: product.id,
			prices: product.prices,
		}) );
		setProductCounter( productCounter + 1 );
		dispatch( startSetShoppingCart() );
	};

	const onReduceToShoppingCart = () => {
		onSettingOrder( 'reduce' );
		dispatch( startReduceToShoppingCart({
			product: product.id,
			prices: product.prices,
		}) );
		setProductCounter( productCounter + 0 );
		dispatch( startSetShoppingCart() );
	};

	const onRemoveToShoppingCart = () => {
		dispatch( startRemoveToShoppingCart( product.id ) );
		dispatch( startSetShoppingCart() );
	};

	return {
		product,
		productCounter, 
		onAddToShoppingCart,
		onReduceToShoppingCart,
		onRemoveToShoppingCart,
	};
};