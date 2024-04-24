import { useLocation } from 'react-router-dom';

export const setLastPath = () => {
   const { pathname, search } = useLocation();

	window.scroll({ top: 0 });

   return sessionStorage.setItem(
		'lastPath',
		pathname !== '/login' ? pathname + search : sessionStorage.getItem('lastPath')
	);
}

export const getLastPath = () => sessionStorage.getItem('lastPath') || '/';
