import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onToogleShoppingCart } from '@/store';
import { currencyFormatter } from '@/helpers';
import { ShoppingCartItem } from '@/interface';
import { MdAddShoppingCart, MdClose } from 'react-icons/md';
import { TbDiscountCheckFilled } from 'react-icons/tb';

export const ShoppingCart = () => {

	const { isLoading, order, shoppingCart, shoppingCartIsOpen } = useSelector( state => state.app );
	const { products } = useSelector( state => state.shop );
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleCloseShoppingCart = () => { 
		dispatch(onToogleShoppingCart());
	};

	const handlePayShoppingCart = ( url ) => {
		handleCloseShoppingCart();
		navigate( url );
	};

	if ( !products.length ) {
		return; 
	}

	return (
		<div className={`ShoppingCart right-0 ${ shoppingCartIsOpen ? 'w-full' : 'w-fit' }`}>
			<div 
				className={`ShoppingCart__backdrop fluid ${ shoppingCartIsOpen ? 'opacity-100' : 'opacity-0' }`}
				onClick={ handleCloseShoppingCart }
			/>
			<div className={`ShoppingCart__content fluid ${ shoppingCartIsOpen ? '' : '-right-[30rem] sm:-right-[30rem]' }`}>					
				<div className="ShoppingCart__header">
					<h1>Shopping Cart</h1>
					<button className="ShoppingCart__close-button fluid" onClick={ handleCloseShoppingCart }>
						<MdClose />
					</button>
				</div>
				{
					(!isLoading && !!shoppingCart.length) && 
						shoppingCart.map( item => <ShoppingCartItem key={ item.product } id={ item.product }/> ) 
				}
				{
					(order.total_products > 0) ?
					<>
						<div className={`ShoppingCart__confirm ${ order.total_products >= 6 ? 'discount' : '' }`}>
							<button className="ShoppingCart__confirm-button fluid" onClick={ () => handlePayShoppingCart('/account/orders/checkout') }>
								<span>Go to pay:</span> 
								<p>
									<span className="fluid">{ currencyFormatter( order.total_prices.retail ) }</span>
									<span className="fluid">{ currencyFormatter( order.total_prices.wholesale ) }</span>
								</p>
							</button>
							<div>
								{
									(order.total_products >= 6)
									? <p><TbDiscountCheckFilled />GOT THE DISCOUNT!</p>
									: <p><span>{ 6 - order.total_products }</span> product(s) more to <span>get DISCOUNT</span></p>
								}
							</div>
						</div>
						<Link className="ShoppingCart__link fluid" to={'/products'} onClick={ handleCloseShoppingCart }>See more products</Link>
					</> : 
					<div className="ShoppingCart__empty">
						<MdAddShoppingCart />
						<span>You don't have products on your Cart yet!<br /> :( </span>
						<button className="ShoppingCart__no-products fluid" onClick={() => handlePayShoppingCart('/products')}>Shop Now</button>
					</div>
				}
			</div>
		</div>
	);
};