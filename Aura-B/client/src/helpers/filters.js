export const filters = ( array, params ) => {
   let result = array;

   [...Object.entries( params )].forEach( param => 
      result = result.filter( product => {
         try {
            if (product[ param[0] ].toLowerCase().includes( param[1].toLowerCase() )) 
               return product;
         } catch  {
            return;
         }
      })
   );

   return result;
};