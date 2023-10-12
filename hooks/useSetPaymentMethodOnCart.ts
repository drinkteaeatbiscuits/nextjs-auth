import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const SET_SHIPPING_METHOD = gql`
mutation SetPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
  setPaymentMethodOnCart(input: $input) {
    cart {
      selected_payment_method {
        code
        purchase_order_number
        title
      }
    }
  }
}
`;

export const useSetPaymentMethodOnCart = () => {

  const [setPaymentMethodOnCart, { data, loading, error }] = useMutation( 
    SET_SHIPPING_METHOD, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {setPaymentMethodOnCart};
};

