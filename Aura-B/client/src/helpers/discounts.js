import { useSelector } from 'react-redux';

export const discounts = (discount) => {
   const { order } = useSelector( state => state.app );

   switch ('wholesale') {
      case value:
         return order.total_products >= 6;
   
      default:
         return false;
   }
};