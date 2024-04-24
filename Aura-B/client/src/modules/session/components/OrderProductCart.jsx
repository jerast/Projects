import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currencyFormatter, resize } from '@/helpers';

export const OrderProductCard = ({ item, discount }) => {
	const { products } = useSelector( state => state.shop );

	const product = products.find( element => element.id === item.product );

	return (
		<div className="OrderProductCard fluid">
			<img className="OrderProductCard__image" src={ resize( product.image, 100 ) } alt="product" />
			<Link className="OrderProductCard__name fluid" to={`/products/${ product.id }`} >{ product.name }</Link>
			<span className="OrderProductCard__count">{ item.count } Units</span>
			<span className={`OrderProductCard__price`}>				
				{ currencyFormatter( (discount ? product.prices.wholesale : product.prices.retail) * item.count ) }
			</span>
		</div>
	);
};
