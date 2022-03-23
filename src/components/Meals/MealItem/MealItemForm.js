import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const submitHandler = (event) => {
		event.preventDefault();

		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (
			enteredAmount.trim() === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(enteredAmountNumber);
	};

	const amountInputRef = useRef();
	return (
		<form action="#" className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: 'amount',
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please set amount between 1 - 5.</p>}
		</form>
	);
}
export default MealItemForm;

/**
 * This is where wanna call the function addItemHandler from the <cart>
 * To do so, we call the useRef hook and bind the ref in <Input> BUT, since the <Input> here is a custom input, we can not attach the ref directly here like the HTML elements. Therefore, we need to make the full cycle and call React.forwardRef() on the <Input>. see there.
 *
 * enteredAmount --  to get the value from a useRef ALWAYS needs to be used with 'current'.This returned value is ALWAYS a string even if the input type is number. Hence, we convert it to a number inside 'enteredAmountNumber'.
 *
 * if we make it past the condition for input, we wanna execute our context function of addCartItemHanlder but we wont be implementing here, rather, make it aware of that function via props. NOTE  we are just getting the 'enteredAmount' value here, and for the rest of the value, such as price,name etc. we will get from other place.
 */

/**
 * ------- useState()
 * we use state to handler the errors
 */
