import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const SET_BILLING_ADDRESS = gql`
mutation SetBillingAddressOnCart($input: SetBillingAddressOnCartInput) {
  setBillingAddressOnCart(input: $input) {
    cart {
      billing_address {
        uid
      }
    }
  }
}
`;

export const useSetBillingAddress = () => {

  const [setBillingAddress, { data, loading, error }] = useMutation( 
    SET_BILLING_ADDRESS, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {setBillingAddress};
};

