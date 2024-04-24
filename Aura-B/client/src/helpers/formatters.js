export const dateFormatter = ( value ) => 
   new Date( value ).toLocaleString();

export const currencyFormatter = ( value ) => 
   new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP',
      maximumFractionDigits: 0, 
      minimumFractionDigits: 0,
   }).format( value );