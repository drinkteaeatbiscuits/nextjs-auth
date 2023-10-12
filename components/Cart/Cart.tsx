import Image from "next/image";
import useGetBasket from "../../hooks/useGetBasket";
import styles from './Cart.module.scss';
import Link from 'next/link';
import { useReactiveVar } from "@apollo/client";
import cartId from "../../constants/cartId";
import { useRemoveFromBasket } from "../../hooks/useRemoveFromBasket";
import { useState } from "react";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import CartQuantity from "../CartQuantity/CartQuantity";
import { useUpdateBasketItems } from "../../hooks/useUpdateBasketItems";
import ProductPrice from "../ProductPrice/ProductPrice";
import { FormattedNumber, IntlProvider } from "react-intl";


const Cart = (props:any) => {

	const {showBasket, setShowBasket, cartData, cartLoading} = props;

	const yourCartId = useReactiveVar(cartId);
	const { removeFromCart } = useRemoveFromBasket();
	const { updateCartItem } = useUpdateBasketItems();
	const [ productRemoving, setProductRemoving ] = useState('');
	

	const handleRemoveFromCart = async (event: any, cart_item_uid: any) => {

		// console.log(cart_item_uid);

		event.preventDefault();

		setProductRemoving(cart_item_uid);

		const data = {
			input: {
				cart_id: yourCartId,
				cart_item_uid: cart_item_uid
			}
		  };
		
		await removeFromCart({variables: data}).then((res) => {
			console.log(res);
		});

	}

	const isProductRemoving = (itemId:any) => {

		if(itemId === productRemoving){
			return styles.removingProduct
		}

	}

	const setQuantity = async (quantity:any, cart_item_uid: any) => {
		// console.log(quantity);

		const data = {
			input: {
				cart_id: yourCartId,
				cart_items: [
					{
						cart_item_uid: cart_item_uid,
						quantity: quantity
					}
				]
				
			}
		};

		await updateCartItem({variables: data}).then((res) => {
			console.log(res);
		});

		
	}

	const isCartOpenStyle = () => {
		return showBasket && styles.showBasket
	}
	// console.log(cartData);
	// console.log(showBasket);

	return <div className={styles.Cart + ' ' + isCartOpenStyle()} style={{
		transform: showBasket ? 'translateX(0px)' : 'translateX(100%)',
		}}>

		<div className={ styles.closeCartOverlay} onClick={() => setShowBasket(false)}></div>
		<div className={ styles.cartInner }>
			
		<div className={styles.cartTop}>
			<div className={styles.cartTitle}><span className={styles.cartTitleText}>Basket</span>{cartData?.customerCart?.total_quantity > 0 && <span className={styles.cartItemCount}>{ cartData?.customerCart?.total_quantity} items</span>}</div>	
			<div className={styles.cartClose}  onClick={() => { setShowBasket(false) }}><svg xmlns="http://www.w3.org/2000/svg" width="18.301" height="18.301" viewBox="0 0 18.301 18.301">
				<path id="close" d="M.479,16.1A1.071,1.071,0,0,0,.44,17.862,1.071,1.071,0,0,0,2.2,17.822l6.953-6.875L16.1,17.822a1.071,1.071,0,0,0,1.758.039,1.071,1.071,0,0,0-.039-1.758L10.947,9.151,17.822,2.2A1.071,1.071,0,0,0,17.862.44,1.071,1.071,0,0,0,16.1.479L9.151,7.354,2.2.479A1.071,1.071,0,0,0,.44.44,1.071,1.071,0,0,0,.479,2.2L7.354,9.151Z" fill="#d6d7dd"/>
				</svg>
			</div>
			
		</div>
		<div className={styles.cartItems}>
			{!cartLoading && cartData?.customerCart?.items.length > 0 && cartData?.customerCart?.items?.map((item: any) => {

				return <div className={styles.cartItem + ' ' + isProductRemoving(item?.uid)} key={item.uid}>
					<div className={styles.imageColumn}>
						<div className={styles.cartItemImageWrap}>
						{item?.configured_variant?.image?.url ? <Image width={100} height={100} src={item?.configured_variant?.image?.url} /> : ( item?.product?.image?.url && <Image width={100} height={100} src={item?.product?.image?.url} /> ) }
					</div>
						
					</div>
					<div className={styles.detailsColumn}>
						<div className={styles.productName}>
							<div className={styles.productNameText}>
							<Link href={item.product.url_key}>{item.product.name}</Link></div>
							
							<div className={styles.removeProduct} onClick={(e:any) => {handleRemoveFromCart(e, item?.uid)}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
									<path id="close" d="M.314,10.559a.7.7,0,0,0-.026,1.153.7.7,0,0,0,1.153-.026L6,7.178l4.559,4.508a.7.7,0,0,0,1.153.026.7.7,0,0,0-.026-1.153L7.178,6l4.508-4.559A.7.7,0,0,0,11.712.288a.7.7,0,0,0-1.153.026L6,4.822,1.441.314A.7.7,0,0,0,.288.288.7.7,0,0,0,.314,1.441L4.822,6Z" fill="#737373"/>
								</svg>
							</div>
						</div>
						{item.configurable_options && <div className={styles.productAttributes}>
								{item.configurable_options.map((configurableOption:any) => {
									
									return <div key={configurableOption.configurable_product_option_value_uid} className={styles.productAttribute}>{configurableOption.value_label}</div>

								})}
							</div>}

						<div className={styles.quantityPrice}>
							<div className="">
								<CartQuantity value={item.quantity} setQuantity={setQuantity} CartItemUid={item.uid} />
							</div>
							<div className={styles.price}>
								{/* <ProductPrice product={item.product} /> */}
								<IntlProvider locale="en" defaultLocale="en"><FormattedNumber value={item.prices?.price?.value} style="currency" currency={item.prices?.price?.currency} /></IntlProvider>
							</div>
						</div>
						

						 {/* x {item.quantity} */}
					</div>
					
					
				</div>
			})}
		</div>
		<div className={styles.cartBottom}>
			<p className={styles.cartSubtotal}>Cart Subtotal: <span className={styles.bold}>{ cartData?.customerCart?.prices?.subtotal_excluding_tax?.value && cartData?.customerCart?.prices?.subtotal_excluding_tax?.currency && <IntlProvider locale="en" defaultLocale="en"><FormattedNumber value={cartData?.customerCart?.prices?.subtotal_excluding_tax?.value} style="currency" currency={cartData?.customerCart?.prices.subtotal_excluding_tax.currency} /></IntlProvider> }</span></p>	
			{ cartData?.customerCart?.items?.length === 0 ? <button className={styles.goToCheckout} disabled={true} >Proceed to Checkout</button> : <Link href={'/checkout'}><button className={styles.goToCheckout} >Proceed to Checkout</button></Link>}


		</div>

		</div>
	</div>;
}

export default Cart;