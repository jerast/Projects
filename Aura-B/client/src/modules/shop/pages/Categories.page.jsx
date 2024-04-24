import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { resize } from '@/helpers';

export const CategoriesPage = () => {

	const { isLoading } = useSelector( state => state.app );
	const { categories } = useSelector( state => state.shop );

	if ( isLoading ) return (
		<>
			<section className="Section">
				<h1 className="Section__title">Categories</h1>
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
		<section className="Section">
			<h1 className="Section__title">Categories</h1>
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
	);
};
