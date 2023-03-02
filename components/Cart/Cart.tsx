import useGetBasket from "../../hooks/useGetBasket";
import styles from './Cart.module.scss';

const Cart = (props:any) => {

	

	const {showBasket, setShowBasket, cartData, cartLoading} = props;

	// console.log(data);
	// console.log(showBasket);

	return <div className={styles.Cart} style={{
		transform: showBasket ? 'translateX(0px)' : 'translateX(100%)',
		
		}}>
			<div style={{cursor: 'pointer'}} onClick={() => { setShowBasket(false) }}>Close</div>
		<h1>Basket</h1>
		{!cartLoading && cartData?.customerCart?.items.length > 0 && cartData?.customerCart?.items?.map((item: any) => {
				return <div key={item.id}>{item.product.name} x {item.quantity}</div>
			})}
	</div>;
}

export default Cart;