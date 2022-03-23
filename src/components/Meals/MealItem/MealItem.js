import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

function MealItem(props) {
	const cartCtx = useContext(CartContext);

	const price = `$${props.price.toFixed(2)}`;

	const addToCartHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price,
		});
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
}
export default MealItem;

/**
 *  Here we define the 'addToCartHandler' and set it inside 'onAddToCart' which we call inside of the <MealItemForm>
 */

/**
 * -------- useContext()
 * Here we call the useContext to access the context. NOTE it is used anywhere where we wanna access the context.
 *
 * we call the function addItem() from the context and pass in the necessary value we wanna have. Which, we get from 'item' argument from the addCart function pointer, that points to the addItemCartHanlder inside <CartProvider>
 */
