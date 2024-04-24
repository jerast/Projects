import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setLastPath } from '@/helpers';
import { 
	onLoadEnds, 
	startGetShoppingCart, 
	startLoadingCategories, 
	startLoadingProducts, 
	startVerifyingSession 
} from '@/store';

export const useLoader = () => {
	const { user } = useSelector( state => state.session );
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		handleLoadingData();
	}, []);
	
	const handleLoadingData = async () => {
		await dispatch( startVerifyingSession() );
		await dispatch( startLoadingProducts() );
		await dispatch( startLoadingCategories() );
		await dispatch( startGetShoppingCart() );
		dispatch( onLoadEnds() );
	};

	setLastPath();
	
	return { user, pathname };
};
