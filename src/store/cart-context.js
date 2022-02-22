import React from 'react';

const CartContext = React.createContext({
 items: [],
 totalAmount: 0,
 addItem: (item) => {},
 removeItem: (id) => {},
});

export default CartContext;
/**
 * Here we are using context since we are gonna manage the state in muliple places
 * we initiated this context key,values to have better auto suggestion
 *
 */
