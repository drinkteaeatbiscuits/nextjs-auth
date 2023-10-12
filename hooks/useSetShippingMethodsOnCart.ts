import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const SET_SHIPPING_METHOD = gql`
mutation SetShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
    setShippingMethodsOnCart(input: $input) {
      cart {
        shipping_addresses {
          selected_shipping_method {
            method_code
          }
        }
      }
    }
  }
`;

export const useSetShippingMethodsOnCart = () => {

  const [setShippingMethodsOnCart, { data, loading, error }] = useMutation( 
    SET_SHIPPING_METHOD, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {setShippingMethodsOnCart};
};

