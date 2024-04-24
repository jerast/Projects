export const setLastOrder = ( order ) => 
   localStorage.setItem('order', JSON.stringify(order));

export const setLastShoppingCart = (shoppingCart) => 
   localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

export const getLastOrder = 
   JSON.parse( localStorage.getItem('order') );

export const getLastShoppingCart = 
   JSON.parse( localStorage.getItem('shoppingCart') );

export const removeLastOrder = () =>
   localStorage.removeItem('order');

export const removeLastShoppingCart = () =>
   localStorage.removeItem('shoppingCart');