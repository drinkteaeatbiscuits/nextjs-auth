import { FormattedNumber, IntlProvider } from 'react-intl';
import useGetBasket from '../../hooks/useGetBasket';
import styles from './ReviewOrder.module.scss';
import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import { usePlaceOrder } from '../../hooks/usePlaceOrder';
import { useReactiveVar } from '@apollo/client';
import cartId from '../../constants/cartId';
import router from 'next/router';



const ReviewOrder = (props:any) => {

    const {cartData} = props;

    const yourCartId = useReactiveVar(cartId);

    const displayPrice = (price:any) => price?.value && price?.currency && <IntlProvider locale="en" defaultLocale="en"><FormattedNumber value={price?.value} style="currency" currency={price?.currency} /></IntlProvider>
    const [showCartItems, setShowCartItems] = useState(false); 
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const {placeOrder} = usePlaceOrder(); 

    console.log(cartData);
    
    const handlePlaceOrder = async (event: any) => {

		// console.log(shipping_address_id);

		event.preventDefault();

        setPlacingOrder(true);

		const data = {
			input: {
				cart_id: yourCartId,
			}
		  };
		
		await placeOrder({variables: data}).then((res:any) => {
			console.log(res);
            /* setOrderNumber(res.data.placeOrder.order.order_number);
            setPlacingOrder(false); */

            res && router.push({ pathname: '/thankyou', query: { order_number: res.data.placeOrder.order.order_number } });
            
		});

	}

    // console.log(cartData?.customerCart);
    
    return <div className={styles.reviewOrder}>
       
       <div className="">
            <h3>Order Summary</h3>
            
            { cartData?.customerCart?.prices?.subtotal_excluding_tax && <div className="row">Subtotal { displayPrice(cartData?.customerCart?.prices?.subtotal_excluding_tax) }</div> }  
            { cartData?.customerCart?.shipping_addresses && cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method?.price_incl_tax && <div className="row">Shipping { displayPrice(cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method?.price_incl_tax) }</div> } 
            { cartData?.customerCart?.prices?.applied_taxes && <div className="row">Tax { displayPrice(cartData?.customerCart?.prices?.applied_taxes[0]?.amount) }</div>  }
            { cartData?.customerCart?.prices?.subtotal_including_tax && <div className="row">Order Total Incl. Tax { displayPrice(cartData?.customerCart?.prices?.subtotal_including_tax) }</div> }  
            { cartData?.customerCart?.prices?.subtotal_excluding_tax && <div className="row">Order Total Excl. Tax { displayPrice(cartData?.customerCart?.prices?.subtotal_excluding_tax) }</div> }

            <div className={styles.cartItems}>
                <div className={styles.cartItemsTitle} onClick={() => setShowCartItems(!showCartItems)}>
                    <div className={styles.cartItemsTitleText}><h3>{cartData?.customerCart?.total_quantity} Order Items</h3></div>
                    <div className={showCartItems ? styles.open : ''}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="9.104" viewBox="0 0 16 9.104">
                        <path id="arrow_carrot_down" data-name="arrow carrot down" d="M14.174.407,8,6.515,1.826.407A.879.879,0,0,0,.365.374a.946.946,0,0,0,0,1.494l6.9,6.9a.969.969,0,0,0,1.461,0l6.9-6.9a.946.946,0,0,0,0-1.494A.879.879,0,0,0,14.174.407Z"/>
                        </svg>
                    </div>
                </div>
                
			    { showCartItems && cartData && cartData?.customerCart?.items.length > 0 && cartData?.customerCart?.items?.map((item: any) => {

				return <div className={styles.cartItem} key={item.uid}>
					<div className={styles.imageColumn}>
						<div className={styles.cartItemImageWrap}>
						{item?.configured_variant?.image?.url ? <Image width={100} height={100} src={item?.configured_variant?.image?.url} /> : ( item?.product?.image?.url && <Image width={100} height={100} src={item?.product?.image?.url} /> ) }
					</div>
						
					</div>
					<div className={styles.detailsColumn}>
						<div className={styles.productName}>
							<div className={styles.productNameText}>
							    {item.product.name}
                            </div>
                            {item.configurable_options && <div className={styles.productAttributes}>
								{item.configurable_options.map((configurableOption:any) => {
									
									return <div key={configurableOption.configurable_product_option_value_uid} className={styles.productAttribute}>{configurableOption.value_label}</div>

								})}
							</div>}
						</div>
						

						<div className={styles.quantityPrice}>
                            <div className={styles.quantity}>
                                Qty: {item.quantity}
                            </div>
                                
							<div className={styles.price}>
								{/* <ProductPrice product={item.product} /> */}
                                { displayPrice(item.prices?.price) }
							</div>
						</div>
					
					</div>
					
					
				</div>
			})}
		</div>
        </div>
        {cartData?.customerCart?.shipping_addresses && cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method?.method_title === 'Delivery'  && <div className="">
            <h3>Ship To</h3>
            <p>{cartData?.customerCart?.shipping_addresses[0]?.firstname} {cartData?.customerCart?.shipping_addresses[0]?.lastname}</p>
            <p>{cartData?.customerCart?.shipping_addresses[0]?.company}</p>
            <p>{cartData?.customerCart?.shipping_addresses[0]?.street && cartData?.customerCart?.shipping_addresses[0]?.street.map((street:any) => {return street + ', '})}</p>
            <p>{cartData?.customerCart?.shipping_addresses[0]?.city}</p>
            <p>{cartData?.customerCart?.shipping_addresses[0]?.postcode}</p>
            <p>{cartData?.customerCart?.shipping_addresses[0]?.telephone}</p>
        </div> }
        {cartData?.customerCart?.shipping_addresses && <div className="">
            <h3>Shipping Method</h3>
            <p>{cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method?.carrier_title} - {cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method?.method_title}</p>
        </div> }

        

        {placingOrder ? <div>Placing Order</div> : <button onClick={(event) => handlePlaceOrder(event)}>Place Order</button>}
         
        {orderNumber}

    </div>
}

export default ReviewOrder;