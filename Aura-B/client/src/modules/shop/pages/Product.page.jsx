import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormatter, resize } from '@/helpers';
import { useShoppingCart } from '@/hooks';
import { clearActiveProduct, onLoadEnds, onLoadStarts, startLoadingSelectedProduct } from '@/store';
import { MdOutlineAdd, MdOutlineDelete, MdOutlineRemove } from 'react-icons/md';
import { TbDiscountCheckFilled } from 'react-icons/tb';

export const ProductPage = () => {
	const { id } = useParams();
	const { isLoading, activeProduct } = useSelector( state => state.app );
	const dispatch = useDispatch();
	const { 
		productCounter, 
		onAddToShoppingCart, 
		onReduceToShoppingCart,
		onRemoveToShoppingCart 
	} = useShoppingCart( id );
	
	useEffect(() => { 
		if (!isLoading) {
			dispatch( onLoadStarts() )
			dispatch( startLoadingSelectedProduct(id) )
			dispatch( onLoadEnds() )
		}
	}, [id, isLoading]);
	
	useEffect(() => () => dispatch( clearActiveProduct() ), []);
		
	if ( isLoading ) return (
		<>
			<h1>Product</h1>
			<h4>Loading...</h4>
		</>
	);
	
	if ( !activeProduct ) return (
		<>
			<h1>Product</h1>
			<h4>Product Not Found</h4>
		</>
	);

	return (
		<>
			<section className="ProductSection">
				<img className="ProductSection__image" src={ resize( activeProduct.image, 500 ) } alt="" />
				<div className="ProductSection__content">
					<div className="ProductSection__data">
						<h1 className="ProductSection__name">{ activeProduct.name }</h1>
						<span className="ProductSection__reference">{ activeProduct.reference }</span>
					</div>
					<div className="ProductSection__prices">
						<span>{ currencyFormatter( activeProduct.prices.retail ) }</span>
						<span><TbDiscountCheckFilled />{ currencyFormatter( activeProduct.prices.wholesale ) }</span>
					</div>
					<span className="ProductSection__description">{ activeProduct.description }</span>
					{/* <span>Left: { activeProduct.stock }</span> */}
					<div className="ProductSection__controls">
						<div>
							<button onClick={ onReduceToShoppingCart } disabled={ productCounter === 0 } >
								<MdOutlineRemove />
							</button>
							<span>{ productCounter }</span>
							<button onClick={ onAddToShoppingCart }>
								<MdOutlineAdd />
							</button>
						</div>
						<div>
							<button className="fluid" onClick={ onAddToShoppingCart }>Add to cart</button>
							{ (productCounter > 0) && <button onClick={ onRemoveToShoppingCart }><MdOutlineDelete /></button> }
						</div>
					</div>
				</div>
			</section>
			{/* <section className="Section">
				<h1 className="Section__title">Related Products</h1>
				<article className="Section__content Section__content--products">
					
				</article>
			</section> */}
		</>
	);
};
