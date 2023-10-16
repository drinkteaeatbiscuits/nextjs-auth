import { NextPage } from "next";
import Header from "../components/Header/Header";
import homeStyles from "../styles/Home.module.scss";
import styles from "../styles/Checkout.module.scss";
import ShippingAddresses from "../components/ShippingAddresses/ShippingAddresses";
import ShippingMethods from "../components/ShippingMethods/ShippingMethods";
import { useEffect, useState } from "react";
import ReviewOrder from "../components/ReviewOrder/ReviewOrder";
import { useSetPaymentMethodOnCart } from "../hooks/useSetPaymentMethodOnCart";
import { useReactiveVar } from "@apollo/client";
import cartId from "../constants/cartId";
import useGetBasket from "../hooks/useGetBasket";
import useGetAddresses from "../hooks/useGetAddresses";
import { useSetShippingAddress } from "../hooks/useSetShippingAddress";
import { useSetShippingMethodsOnCart } from "../hooks/useSetShippingMethodsOnCart";
import Notifications from "../components/Notifications/Notifications";

const Checkout: NextPage = () => {

	// const {data, error, refetch, loading} = useGetBasket();

	// console.log(data);
	const [getBasket, { data: cartData, error, refetch, loading: cartLoading }] = useGetBasket();
	const { data: addresses, loading: addressesLoading } = useGetAddresses();
	
	const [ selectedShippingAddress, setSelectedShippingAddress ] = useState<any>(null);
	const [ selectedShippingMethod, setSelectedShippingMethod ] = useState<any>(null);
	const [ paymentMethod, setPaymentMethod ] = useState<any>(null);
	
	const [ checkoutSection, setCheckoutSection ] = useState('shipping');
	const { setPaymentMethodOnCart } = useSetPaymentMethodOnCart();
	const {setShippingAddress} = useSetShippingAddress();
	const {setShippingMethodsOnCart} = useSetShippingMethodsOnCart();

	
	const yourCartId = useReactiveVar(cartId);
	
	
	useEffect(() => {

		// console.log('select address');

		// select shipping address
		if( yourCartId && !selectedShippingAddress){

			if(cartData?.customerCart?.shipping_addresses[0]?.postcode){

				setSelectedShippingAddress(cartData?.customerCart?.shipping_addresses[0]);
			
			}else if(addresses?.customer?.addresses?.find((address:any) => address.default_shipping).id){
				 
				handleSetShippingAddress();
				

			}

		}else if( selectedShippingAddress?.postcode !== cartData?.customerCart?.shipping_addresses[0].postcode ){

			setSelectedShippingAddress(cartData?.customerCart?.shipping_addresses[0]);

		}

	}, [cartData, addresses]);


	useEffect(() => {

		

		// select shipping method
		if( selectedShippingAddress ){
			
			// console.log('set shipping method');
			
			if(!selectedShippingMethod){

				if(cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method){
	
					setSelectedShippingMethod(cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method)
	
				}else if( cartData?.customerCart?.shipping_addresses[0]?.available_shipping_methods[0]?.carrier_code ){
					 
					handleSetShippingMethod();
					
	
				}
	
			}else if( selectedShippingMethod?.carrier_code !== cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method?.carrier_code ){
	
				setSelectedShippingAddress(cartData?.customerCart?.shipping_addresses[0]?.selected_shipping_method);
	
			}

		}
		
	}, [cartData, selectedShippingAddress]);

	useEffect(() => {

		if(selectedShippingMethod){

			// console.log('set payment method');

			if(!paymentMethod){

				if(cartData?.customerCart?.selected_payment_method?.code){
					
					setPaymentMethod(cartData?.customerCart?.selected_payment_method);

				}else if( cartData?.customerCart?.available_payment_methods ){
					
					handleSetPaymentMethod();

				}

			}else if( paymentMethod?.code !== cartData?.customerCart?.selected_payment_method?.code ){

				setPaymentMethod(cartData?.customerCart?.selected_payment_method);

			}
		}
		
	}, [cartData, selectedShippingMethod]);

	const handleSetShippingMethod = async () => {

		await setShippingMethodsOnCart({variables: {
			input: {
				cart_id: yourCartId,
				shipping_methods: [
                    {
                        carrier_code: cartData.customerCart.shipping_addresses[0].available_shipping_methods[0].carrier_code,
                        method_code: cartData.customerCart.shipping_addresses[0].available_shipping_methods[0].method_code
                    }
                  ]
			}
		  }}).then((res) => {
			console.log(res);
		});
	}

	const handleSetShippingAddress = async () => {
		await setShippingAddress({variables: {
			input: {
				cart_id: yourCartId,
				shipping_addresses: [
					{
					  customer_address_id: addresses?.customer?.addresses?.find((address:any) => address.default_shipping).id
					}
				  ]
			}
		  }}).then((res) => {
			console.log(res);
		});
	}
	

	const handleSetPaymentMethod = async () => {
		
		const data = {
			input: {
				cart_id: yourCartId,
				payment_method: {
					code: "cashondelivery"
				}
			}
		  };

		await setPaymentMethodOnCart({variables: data}).then((res) => {
			console.log(res);
			// setPaymentMethod(res.data.setPaymentMethodOnCart.cart.selected_payment_method.code);
		});

	}

	// console.log(cartData);

	// useEffect(() => {

	// 	// !paymentMethod && cartData?.customerCart?.shipping_addresses.length > 0 && handleSetPaymentMethod();

	// 	yourCartId && handleSetupCheckout();

	// }, [cartData]);

	// console.log(cartData);
	// console.log(selectedShippingAddress);
	// console.log(selectedShippingMethod);

	useEffect(() => {
		!cartData && getBasket();
	}, [yourCartId]);

	return <div className={homeStyles.container}>
		<Header />
		<Notifications />

		<main style={{padding: '70px 0 0'}}>
        <h1>Checkout</h1>

		{ cartData?.customerCart?.items?.length === 0 ? <div className=""><p>Please add items to your cart.</p></div> : <><div className={ styles.checkoutSection + ' ' + ( checkoutSection === 'shipping' && styles.active )}>
			<h2>Shipping Address</h2>
			{selectedShippingAddress && <ShippingAddresses cartData={cartData} addresses={addresses} selectedShippingAddress={selectedShippingAddress} /> }
			{selectedShippingMethod && <ShippingMethods cartData={cartData} shippingMethod={selectedShippingMethod} />}

			<button onClick={() => setCheckoutSection('review')}>Next</button>
		</div>

		<div className={ styles.checkoutSection + ' ' + ( checkoutSection === 'review' && styles.active )}>

			<button onClick={() => setCheckoutSection('shipping')}>Back</button>
			<h2>Review & Place Order</h2>

			<ReviewOrder cartData={cartData} />

		</div>
		</> }
		
        
      </main>
	</div>
}

export default Checkout;