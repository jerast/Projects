export const sorters = ( origin, prop, reverse = false ) => {
   let array = [...origin];

   switch (prop) {
      case 'name':
         return array.sort( (a,b) => !reverse ? a.name > b.name : a.name < b.name );
      
      case 'category':
         return array.sort( (a,b) => !reverse ? a.category > b.category : a.category < b.category );
      
      case 'retail':
         return array.sort( (a,b) => !reverse ? a.prices.retail > b.prices.retail : a.prices.retail < b.prices.retail );
      
      case 'discount':
         return array.sort( (a,b) => !reverse ? a.prices.wholesale > b.prices.wholesale : a.prices.wholesale < b.prices.wholesale );
         
      default:
         return array;
   };
};