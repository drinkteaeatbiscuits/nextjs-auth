import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const ADD_TO_CART = gql`
mutation AddProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
  addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
    cart {
      id
      total_quantity
    }
    user_errors {
      code
      message
    }
  }
}
`;

export const useAddToBasket = () => {

  const [addToCart, { data, loading, error }] = useMutation( 
    ADD_TO_CART, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {addToCart};
};

