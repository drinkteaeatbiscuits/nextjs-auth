import { useReactiveVar } from '@apollo/client';
import useGetAddresses from '../../hooks/useGetAddresses';
import { useSetShippingAddress } from '../../hooks/useSetShippingAddress';
import styles from './ShippingAddresses.module.scss';
import cartId from '../../constants/cartId';
import useGetSelectedShippingAddress from '../../hooks/useGetSelectedShippingAddress';
import { useEffect, useState } from 'react';

const ShippingAddresses = (props:any) => {

    const { cartData, addresses, selectedShippingAddress } = props;

    const { setShippingAddress } = useSetShippingAddress();
    const yourCartId = useReactiveVar(cartId);
    const [selectedPostcode, setSelectedPostcode] = useState<any>(null);

    useEffect(() => {
        
        selectedShippingAddress && setSelectedPostcode(selectedShippingAddress.postcode);

    }, [selectedShippingAddress]);

    const handleSetAddress = async (event: any, shipping_address_id: any, selected_postcode:any) => {

		event && event.preventDefault();

		const data = {
			input: {
				cart_id: yourCartId,
				shipping_addresses: [
                    {
                      customer_address_id: shipping_address_id
                    }
                  ]
			}
		  };
          
          setSelectedPostcode(selected_postcode);

		await setShippingAddress({variables: data}).then((res) => {
			console.log(res);

            
		});

	}

    return <div>
        {addresses && addresses?.customer?.addresses?.length > 0 && addresses?.customer?.addresses.map((address:any) => {

            return <div className={styles.address + ' ' + (selectedPostcode === address.postcode && styles.selected)} key={address.id} 
                        onClick={(event) => { selectedPostcode !== address.postcode && handleSetAddress(event, address.id, address.postcode) }}>
                <p>{address.firstname} {address.lastname}</p>
                <p>{address.company}</p>
                <p>{address.street && address.street.map((street:any) => {return street + ', '})}</p>
                <p>{address.city}</p>
                <p>{address.postcode}</p>
            </div>
        })}
    </div>
}

export default ShippingAddresses;