import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '@/modules/shop';
import { resize } from '@/helpers';

export const HomePage = () => {
	const { isLoading } = useSelector( state => state.app );
	const { categories, products } = useSelector( state => state.shop );
	const navigate = useNavigate();

	if ( isLoading ) return (
		<>
			<figure className="Banner">
				<figcaption className="Banner__caption loading">
					<h1 />
					<h1 />
					<button />
				</figcaption>
			</figure>

			<section className="Section Section--main">
				<h1 className="Section__title loading" />
				<article className="Section__content loading">
					<a><span /></a> 
					<a><span /></a> 
					<a><span /></a> 
					<a><span /></a> 
				</article>
			</section>
		</>
	);

	return (
		<>
			<figure className="Banner">
				<img 
					className="Banner__image" 
					src="https://res.cloudinary.com/dlgvigwlh/image/upload/v1684384491/Aura-B/Posts/banner-1_sgryom.jpg"
				/>
				<figcaption className="Banner__caption">
					<h1>Level up your beauty with our products collection</h1>
					<button onClick={() => navigate('/products')}>Shop now</button>
				</figcaption>
			</figure>

			<section className="Section Section--main">
				<h1 className="Section__title">Top Categories</h1>
				<article className="Section__content Section__content--categories">
					{
						categories.map( category => 
							<Link 
								key={ category.id }
								className="Category fluid" 
								to={`/${ category.name.toLowerCase() }`}
							>
								<img 
									className="Category__image fluid"
									src={ resize( category.image, 350 ) } 
									alt={ category.name } 
								/>
								<span className="Category__caption">{ category.name }</span>
							</Link> 
						)
					}
				</article>
			</section>

			<section className="Section Section--main">
				<h1 className="Section__title">Featured Produts</h1>
				<article className="Section__content Section__content--products">
					{
						(products.slice(1, 7)).map( product => 
							<ProductCard key={ product.id } product={ product } />
						)
					}
				</article>
			</section>
		</>
	);
};
