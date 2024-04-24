import { useSelector } from 'react-redux';
import { OrderCard } from '@/modules/session';

export const OrdersPage = () => {
	const { orders } = useSelector( state => state.session );
	const { isLoading, isSaving } = useSelector( state => state.app );
	
	if ( isLoading ) return (
		<>
			<h1>Orders</h1>
			<h4>Loading...</h4>
		</>
	);
	
	if ( !orders.length ) return (
		<>
			<h1>Orders</h1>
			<h4>Nothing in it...</h4>
		</>
	);

	return (
		<section className="Section">
			<h1 className="Section__title">My Orders</h1>
			<article className="Section__content OrderList">
			{ isSaving && <div>Wait a second...</div> }
				{ [...orders].reverse().map( order => <OrderCard key={ order.id } order={ order } /> ) }
			</article>
		</section>
	);
};
