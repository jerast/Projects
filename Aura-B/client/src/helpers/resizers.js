export const resize = ( imageUrl, size ) => 
   [ imageUrl.slice(0, 50), `w_${ size }`, imageUrl.slice(49) ].join('');