import { useEffect, useState } from 'react';

import styles from './CartQuantity.module.scss';
import useDebounce from '../../hooks/useDebounce';

const CartQuantity = (props:any) => {

	const {value, setQuantity, CartItemUid} = props;

	const [quantity, setTheQuantity] = useState<any>(null);
	const debouncedQuantity = useDebounce(quantity, 500)

	useEffect(() => {

		if(debouncedQuantity) {
			// console.log('quantity set');
			value !== quantity && setQuantity(quantity, CartItemUid);
		}
	
	}, [debouncedQuantity]);

	useEffect(() => {

		!quantity && setTheQuantity(value); 

		value !== quantity && setTheQuantity(value);
	
	}, [value]);



	const increaseQuantity = (e:any) => {
		e.preventDefault();

		let newValue = quantity || 1;
		newValue++;
		newValue !== quantity && setTheQuantity(newValue);
	}

	const decreaseQuantity = (e:any) => {
		e.preventDefault();

		let newValue = quantity;
		newValue > 1 && newValue--;
		newValue !== quantity && setTheQuantity(newValue);
	}

	const isDisabled = () => {
		return value <= 1 && styles.disabledMinus

	}

	return <div className={styles.productQuantity }>
		<div className={styles.minus + ' ' + isDisabled()} onClick={(e:any) => decreaseQuantity(e)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
				<g id="Group_359" data-name="Group 359" transform="translate(-243 -318)">
					<circle id="Ellipse_9" data-name="Ellipse 9" cx="17.5" cy="17.5" r="17.5" transform="translate(243 318)" fill="#d6d6d6"/>
					<path id="plus" d="M12.519,7.04a2.575,2.575,0,0,1-.092.734q-.092.306-.54.306H.632q-.449,0-.54-.306A2.575,2.575,0,0,1,0,7.04a2.575,2.575,0,0,1,.092-.734Q.184,6,.632,6H11.887q.449,0,.54.306A2.575,2.575,0,0,1,12.519,7.04Z" transform="translate(254.359 328.709)" fill="#fff"/>
				</g>
			</svg>
		</div>
		<input id={'cartQuantity_' + CartItemUid} className={styles.quantityInput} type="number" value={quantity || 1} readOnly />
		<div className={styles.plus}  onClick={(e:any) => increaseQuantity(e)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
				<g id="Group_360" data-name="Group 360" transform="translate(-318 -318)">
					<circle id="Ellipse_8" data-name="Ellipse 8" cx="17.5" cy="17.5" r="17.5" transform="translate(318 318)" fill="#d6d6d6"/>
					<path id="plus" d="M12.519,6.26a2.575,2.575,0,0,1-.092.734q-.092.306-.54.306H7.3v4.608q0,.428-.306.52a2.575,2.575,0,0,1-.734.092,2.575,2.575,0,0,1-.734-.092q-.306-.092-.306-.52V7.3H.632q-.449,0-.54-.306A2.575,2.575,0,0,1,0,6.26a2.575,2.575,0,0,1,.092-.734q.092-.306.54-.306H5.22V.632Q5.22.2,5.526.1A2.334,2.334,0,0,1,6.26,0a2.334,2.334,0,0,1,.734.1Q7.3.2,7.3.632V5.22h4.588q.449,0,.54.306A2.575,2.575,0,0,1,12.519,6.26Z" transform="translate(329.576 329.49)" fill="#fff"/>
				</g>
			</svg>
		</div>
	</div>

}

export default CartQuantity;