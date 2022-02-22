import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
 return (
  <div className={classes.input}>
   <label htmlFor={props.input.id}>{props.label}</label>
   <input {...props.input} ref={ref} />
  </div>
 );
});
export default Input;

/* Here props destructuring on input means, we will automatically configure into type='text' or anything such since we will have the props in key/value pair here as of object*/

/**
 * @RefForward -- Here we forward this ref and make the ref available from here to anywhere where this component will be used.
 * Note how we assign the ref on HTML <input> here in order to make the full cycle complete from mealItemForm.WItht this we can get the value of the input field.
 */
