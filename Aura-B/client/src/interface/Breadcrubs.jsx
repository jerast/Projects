import { toCapitalize } from '@/helpers';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

export const Breadcrubs = () => {
   const { products, categories } = useSelector( state => state.shop );
   const { isLoading } = useSelector( state => state.app );
   const { pathname } = useLocation();

   if ( pathname === '/' || pathname === '/login' ) return ;

   if ( isLoading ) return ;

   const paths = pathname.slice(1).split('/');

   const appPaths = () => {
      if ( categories.some( category => category.name.toLowerCase() === paths[0] ) ) {
         return (
            <>
               <NavLink to="/products">
                  Products
               </NavLink>
               <span>
                  { toCapitalize( paths[0] ) }
               </span>
            </>
         );
      };

      return (
         paths.map( path => <NavLink key={ path } to={ '/'+path }>{ toCapitalize(path) }</NavLink> )
      );
   };

   const productPaths = () => {
      const { category, name } = products.find( product => product.id === paths[1] );

      return (
         <>
            <NavLink to="/products">
               Products
            </NavLink>
            <NavLink to={ '/' + category.toLowerCase() }>
               { category[0].toUpperCase() + category.slice(1) }
            </NavLink>
            <span>
               { name }
            </span>
         </>
      );
   };


   return (
      <div className="Breadcrumbs">
         <NavLink to={ '/' }>Home</NavLink>
         {
            (paths[0] === 'products' && paths.length === 2) ? productPaths() : appPaths()
         }
      </div>
   );
};