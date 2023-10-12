import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const SET_SHIPPING_ADDRESS = gql`
mutation SetShippingAddressesOnCart($input: SetShippingAddressesOnCartInput) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        shipping_addresses {
          uid
        }
      }
    }
  }
`;

export const useSetShippingAddress = () => {

  const [setShippingAddress, { data, loading, error }] = useMutation( 
    SET_SHIPPING_ADDRESS, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {setShippingAddress};
};

