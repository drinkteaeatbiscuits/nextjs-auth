import { gql, useMutation } from "@apollo/client";
import client from "../constants/apollo-client";


const UPDATE_CART_ITEM = gql`
mutation UpdateCartItems($input: UpdateCartItemsInput) {
	updateCartItems(input: $input) {
	  cart {
		total_quantity
		items {
		  product {
			name
		  }
		  quantity
		}
	  }
	}
  }
`;

export const useUpdateBasketItems = () => {

  const [updateCartItem, { data, loading, error }] = useMutation( 
    UPDATE_CART_ITEM, { 
      errorPolicy: "ignore",
      onCompleted(data, res) {

        console.log(data);

        client.refetchQueries({ include: "active" });
        
      }
    });

  return {updateCartItem};
};

