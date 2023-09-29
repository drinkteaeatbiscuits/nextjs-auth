import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const REMOVE_FROM_CART = gql`
mutation Mutation($input: RemoveItemFromCartInput) {
  removeItemFromCart(input: $input) {
    cart {
      total_quantity
    }
  }
}
`;

export const useRemoveFromBasket = () => {

  const [removeFromCart, { data, loading, error }] = useMutation( 
    REMOVE_FROM_CART, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {removeFromCart};
};

