import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

function Cart(props) {
 const cartCtx = useContext(CartContext);
 const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

 const hasItems = cartCtx.items.length > 0;
 const cartItemRemoveHandler = (id) => {
  cartCtx.removeItem(id);
 };

 const cartItemAddHandler = (item) => {
  cartCtx.addItem({ ...item, amount: 1 });
 };

 const cartItems = (
  <ul className={classes['cart-items']}>
   {cartCtx.items.map((item) => (
    <CartItem
     key={item.id}
     name={item.name}
     amount={item.amount}
     price={item.price}
     onRemove={cartItemRemoveHandler.bind(null, item.id)}
     onAdd={cartItemAddHandler.bind(null, item)}
    />
   ))}
  </ul>
 );

 return (
  <Modal onClose={props.onClose}>
   {cartItems}
   <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
   </div>
   <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
     Close
    </button>
    {hasItems && <button className={classes.button}>Order</button>}
   </div>
  </Modal>
 );
}
export default Cart;

//-----------NOTES

/**
 * Here we get the hideCart handler from the App to make the full cycle.
 * 1.close for the modal
 * 2.close for the close button itself
 *
 * @cartCtx -
 * we used it here to get the data from <MealtemForm> and render it in the cart.
 *
 * @hasItems -
 * To check if we have items then render the button.
 *
 * @onRemove and @onAdd -
 *
 * Bind - used to pass in the id of the item on that handler and to pass in the whole item on add.
 */
