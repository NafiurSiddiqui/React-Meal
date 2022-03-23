import React from 'react';
import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
	return (
		<>
			<header className={classes.header}>
				<h1> React meals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImg} alt="A table full of delicious food!" />
			</div>
		</>
	);
}
export default Header;

// NOTES -

/**@HeaderCartButton
 * Here we added the props from Cart's showCart handlers via props on Button. To make it a full cycle, we need to pass it to the parent. In this case, we finally call this onClick prop on <headerCartButton>'s <Button> element.
 *
 */
