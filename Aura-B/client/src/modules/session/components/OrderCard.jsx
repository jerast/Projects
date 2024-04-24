import { Link } from 'react-router-dom';
import { currencyFormatter, dateFormatter } from '@/helpers';

export const OrderCard = ({ order }) => {
   
   const handleOrderStateClass = () => {
      switch (order.state) {
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
      <Link className="OrderCard" to={`/account/orders/${ order.id }`}>
         <span className="OrderCard__id">{ order.id }</span>
         <span className="OrderCard__date">{ dateFormatter( order.date ) }</span>
         <span className={`OrderCard__state ${ handleOrderStateClass() }`}>{ order.state }</span>
         <span className="OrderCard__price">{ currencyFormatter( order.total_price ) }</span>
      </Link>
   );
};