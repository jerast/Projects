import { Link } from 'react-router-dom';
import { currencyFormatter, resize } from '@/helpers';
import { useShoppingCart } from '@/hooks';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { TbDiscountCheckFilled } from 'react-icons/tb';

export const ProductCard = ({ product }) => {
	const { onAddToShoppingCart } = useShoppingCart( product.id );

	return (
		<div className="ProductCard ProductCart--primary" key={ product.id }>
			<Link to={`/products/${ product.id }`}>
				<img className="ProductCard__image" src={ resize( product.image, 350 ) } alt="" />
			</Link>
			<div className="ProductCard__info">
				<Link className="ProductCard__name" to={`/products/${ product.id }`}>
					{ product.name }
				</Link>
				<p className="ProductCard__prices">
					<span>{/* <TbDiscountCheckFilled /> */}{ currencyFormatter(product.prices.wholesale) }</span>
					<span>{ currencyFormatter(product.prices.retail) }</span>
				</p>
			</div>
			<button  className="ProductCard__button" onClick={ onAddToShoppingCart }>
				<MdOutlineAddShoppingCart />
				<span className="fluid">Add to Cart</span>
			</button>
		</div>
	);
};