import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		//checking for duplicate items
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
			//   concat returns a new array rather than mutating existing array.
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	//removing item
	if (action.type === 'REMOVE') {
		//find the index
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		//reach out for the item itself
		const existingItem = state.items[existingCartItemIndex];
		//update the amount
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		//have an updated item variable, to keep track of changes
		let updatedItems;
		//remove item entirely if < 1
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			//decrease the amount
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			//update the state items
			updatedItems = [...state.items];
			//we override the old array with the updated item
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;

/**
 * This is to manage the <cart-context> data and provide the data to any component that needs it.
 * REMEMBER the context provider and consumer concept.
 * We manage all the logic of cart here
 */

/**
 * ------------useReducer
 * we are going to need to manage the mulitiple complext state, where we check for an existing cart item, updating them and removing items. Therefore, the useReducer is choosen here instated of useState.
 *
 * useReducer is created outside, because it does not need any data from the component and also it should not be re-evalutated everytime this component is re-rendered.
 *@cartReducer
 * state: is the last state snapshot managed by the reducer
 * action: dispatched by you later down anywhere in the code
 * useReducer - always returns an array.
 * cartState -- is needed to construct the cartContext obj{}
 * we could push the added items to the items array, but we grouped the items of the same meal together and manage the amount on a per meal basis.
 *@DispathCartState -- can be anything. Here we are using as an object, first the type to identify and the second 'item' to forward the item arg we get from the function to the reducer.
 Keeping the name ALL CAPS is a convention of React dispatch state.
 *we group together the items in the cart array instead of one, so that we can manage the amount on the per meal basis.
 *@const updatedItem = we concat them. which adds an new item to the array but returns a new array unlike push.Because we wanna update our state here in immutable way.
 we don't want the old array in the memory but a new one since it is a new item.

 @filter - executed for every item in the array.we checkd for the action id not equal to the item id, we then generate a new array of updated items and filter out the remove id.

 *We wanna remove the item with the id that we check for in the action.
 */
