import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveOrder, onLoadEnds, onLoadStarts, startLoadingSelectedOrder } from '@/store';
import { OrderProductCard } from '@/modules/session';
import { currencyFormatter, dateFormatter } from '@/helpers';

export const OrderPage = () => {
	const { id } = useParams();
	const { orders } = useSelector( state => state.session );
	const { isLoading, activeOrder } = useSelector( state => state.app );
	const dispatch = useDispatch();

	useEffect(() => { 
		if (!isLoading) {
			dispatch( onLoadStarts() )
			dispatch( startLoadingSelectedOrder(id) )
			dispatch( onLoadEnds() )
		}
	}, [orders, isLoading]);

	useEffect(() => () => dispatch( clearActiveOrder() ), []);
	

	if ( isLoading ) return (
		<>
			<h1>order</h1>
			<h4>Loading...</h4>
		</>
	);

	if ( !activeOrder ) return (
		<>
			<h1>order</h1>
			<h4>Order Not Found</h4>
		</>
	);

	const handleOrderStateClass = () => {
      switch (activeOrder.state) {
         case 'Pending':
            return 'OrderCard__state--pending';
         case 'Active':
            return 'OrderCard__state--active';
         case 'Delivered':
            return 'OrderCard__state--delivered';
         case 'Cancelled':
            return 'OrderCard__state--cancelled';
      
         default:
            return 'OrderCard__state';
      };
   };

	return (
		<section className="Section ">
			<h1 className="Section__title">Order Details</h1>
			<article className="OrderConfirm OrderConfirm--order">
				<div className="OrderConfirm__resume">
					<table>
						
						<tbody>
							<tr>
								<td>Order No.</td>
								<td>{ activeOrder.id }</td>
							</tr>
							<tr>
								<td>Start Date</td>
								<td>{ dateFormatter(activeOrder.date) }</td>
							</tr>
							<tr>
								<td>Total Products</td>
								<td>{ activeOrder.list.reduce( (accum, item) => accum + item.count, 0 ) } products</td>
							</tr>
							<tr className="OrderConfirm__discount">
								<td>Discount</td>
								<td>
									{ 
										currencyFormatter( activeOrder.discount 
											? activeOrder.list.reduce( (accum, item) => accum + (item.prices.retail - item.prices.wholesale) * item.count, 0 ) * (-1)
								 			: 0 
										)
									}
								</td>
							</tr>
							<tr><td><hr /></td><td><hr /></td></tr>
							<tr className="OrderConfirm__total">
								<td>Total</td>
								<td>{ currencyFormatter( activeOrder.total_price ) }</td>
							</tr>
							<tr className="OrderConfirm__state">
								<td>State</td>
								<td className="flex justify-end"><span className={`OrderCard__state ${ handleOrderStateClass() }`}>{ activeOrder.state }</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="OrderConfirm__list">
					{
						activeOrder.list.map( item => <OrderProductCard key={ item.product } item={ item } discount={ activeOrder.discount }/> ) 
					}
				</div>
			</article>
		</section>
   );
};
