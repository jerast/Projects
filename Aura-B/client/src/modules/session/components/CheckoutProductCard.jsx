import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useShoppingCart } from '@/hooks';
import { currencyFormatter, resize } from '@/helpers';
import { TbDiscountCheckFilled } from 'react-icons/tb';

export const CheckoutProductCard = ({ id }) => {
	const { order } = useSelector( state => state.app );
	const { 
		product,
		productCounter,
	} = useShoppingCart( id );

	return (
		<div className="OrderProductCard fluid">
			<img className="OrderProductCard__image" src={ resize( product.image, 100 ) } alt="product" />
			<Link className="OrderProductCard__name fluid" to={`/products/${ product.id }`} >{ product.name }</Link>
			<span className="OrderProductCard__count">{ productCounter } Units</span>
			<span className={`OrderProductCard__price fluid ${ order.total_products >= 6 ? 'discount' : '' }`}>				
				<span>
				{ 
					currencyFormatter( 
						(order.total_products >= 6 ? product.prices.wholesale : product.prices.retail) * productCounter
					) 
				}
				</span>
				{ order.total_products >= 6 && <TbDiscountCheckFilled /> }
			</span>
		</div>
	);
};
