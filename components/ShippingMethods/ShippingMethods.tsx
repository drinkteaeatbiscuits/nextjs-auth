import { useReactiveVar } from "@apollo/client";
import cartId from "../../constants/cartId";
import useGetShippingMethods from "../../hooks/useGetShippingMethods";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useSetShippingMethodsOnCart } from "../../hooks/useSetShippingMethodsOnCart";
import { useEffect, useState } from "react";
import styles from './ShippingMethods.module.scss';


const ShippingMethods = (props:any) => {

    const { cartData, shippingMethod } = props

    const yourCartId = useReactiveVar(cartId);

    // const {data: shippingMethods} = useGetShippingMethods(yourCartId);
    const {setShippingMethodsOnCart} = useSetShippingMethodsOnCart();

    const [selectedShippingMethod, setSelectedShippingMethod] = useState({carrier_code: null, method_code: null});

    // useEffect(() => {

    //     cartData?.customerCart?.shipping_addresses && cartData?.customerCart?.shipping_addresses.length > 0 && cartData.customerCart.shipping_addresses[0].selected_shipping_method && setSelectedShippingMethod(cartData.customerCart.shipping_addresses[0].selected_shipping_method);
    
    //     !selectedShippingMethod.carrier_code && cartData?.customerCart?.shipping_addresses[0]?.available_shipping_methods[0] && handleSetShippingMethod(null, cartData.customerCart.shipping_addresses[0].available_shipping_methods[0].carrier_code, cartData.customerCart.shipping_addresses[0].available_shipping_methods[0].method_code );

    // }, [cartData]);

    useEffect(() => {
        
        shippingMethod && setSelectedShippingMethod(shippingMethod);

    }, [shippingMethod]);

    // console.log(shippingMethods);
    // console.log(selectedShippingMethod);

    const handleSetShippingMethod = async (event: any, carrier_code: any, method_code: any) => {

		// console.log(shipping_address_id);

		event && event.preventDefault();

		const data = {
			input: {
				cart_id: yourCartId,
				shipping_methods: [
                    {
                        carrier_code: carrier_code,
                        method_code: method_code
                    }
                  ]
			}
		  };

          setSelectedShippingMethod({
            carrier_code: carrier_code,
            method_code: method_code});
		
		await setShippingMethodsOnCart({variables: data}).then((res) => {
			console.log(res);
		});

	}

    return <div className="">
        <h2>Shipping methods</h2>

        { cartData?.customerCart?.shipping_addresses && cartData?.customerCart?.shipping_addresses.length > 0 && cartData.customerCart.shipping_addresses[0].available_shipping_methods.map((shippingMethod:any) => {

            return <div className={ styles.shippingMethod + ' ' + (selectedShippingMethod?.method_code === shippingMethod.method_code && styles.selected) } key={shippingMethod.method_code} onClick={(event) => handleSetShippingMethod(event, shippingMethod.carrier_code, shippingMethod.method_code)}>
                
                <div className={styles.selectIndicator}></div>
                <p><IntlProvider locale="en" defaultLocale="en"><FormattedNumber value={shippingMethod.amount.value} style="currency" currency={shippingMethod.amount.currency} /></IntlProvider></p>
                <p>{shippingMethod.method_title}</p>
                <p>{shippingMethod.carrier_title}</p>
            </div>
        })}
    </div>

}

export default ShippingMethods;