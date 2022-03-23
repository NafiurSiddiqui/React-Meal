import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

function HeaderCartButton(props) {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);
	//pull out items only from cartCtx
	const { items } = cartCtx;

	const numberOfCartItems = items.reduce(
		// 👆 items = object destructured items.
		(curNumber, item) => {
			return curNumber + item.amount;
		},
		0
	);
	//animation for button
	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ' '
	} `;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);
		//set a timer to remove the class
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		//clean up
		return () => {
			clearTimeout(timer);
		};
	}, [items]);
	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
}
export default HeaderCartButton;

//NOTES

/**
 * Here we finally make the full cycle of passing the function 'showCartHandler' from the <Cart> to <HeaderCartButton> to here <button> as the child to parent component cycle. Lifting state up.
 *
 * numberOfCartItems -- here we reduce it to a single value since we don't want the items length here as the items might be duplicate items and we just want the number of items in amount, not the number of items per item. */

/**
 * @useContext -
 * To consume the context NOT the provider and get the datas from there
 *
 * @useEffect -
 * to deal with the animation changes
 *add bump class - if there is an item and item length > 1.
 * @const { items } - we did this in order to not  rerender everything when something happen in the cartCtx but only when somehting happens with the items only
 * @useEffect - [dependency] used items only from the object destructuing in order to only track of items, not the whole cartCtx.
 * @useState -
 * To check for btn state
 * @setTimeout
 * to remove the class within 300ms to run the effect not only once but everytime something is added to the cart
 * 300ms = animation timer set in css.
 *
 * @clearTimeout -
 * To clean it becasue the button maybe clicked before it expired.
 */
