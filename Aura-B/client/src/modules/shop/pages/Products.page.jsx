import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProductCard } from '@/modules/shop';
import { filters, queryParams, sorters } from '@/helpers';

export const ProductsPage = () => {
	const { isLoading } = useSelector( state => state.app );
	const { products, categories } = useSelector( state => state.shop );
	const { search, pathname } = useLocation();

	const handleFilterProducts = () => {
		if ( categories.some( category => category.name.toLowerCase() === pathname.slice(1) ) )
			return filters( products, { ...queryParams(search), category: pathname.slice(1) } );

		if ( search ) 
			return filters( products, queryParams(search) );

		return sorters( products, 'normal', false );
	};

	if ( isLoading ) return (
		<>
			<h1>Products</h1>
			<h3>Loading...</h3>
		</>
	);

	if ( !products.length ) return (
		<>
			<h1>Products</h1>
			<h3>No Products finded</h3>
		</>
	);

	return (
		<section className="Section">
			<article className="ProductList">
			{
				handleFilterProducts().map( product => (
					<ProductCard key={ product.id } product={ product } />
				))
			}
			</article>
		</section>
	);
};
